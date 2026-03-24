from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from .database import SessionLocal, Base, engine
from .models import SinhVien, HocPhan, BangDiem, Nganh, Admin
from .seed import seed


app = FastAPI()


# ================= STARTUP =================
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    seed()


# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ================= DB =================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ================= ROOT =================
@app.get("/")
def root():
    return {"message": "Backend running"}


class LoginRequest(BaseModel):
    username: str
    password: str
    role: str


@app.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    
    # ===== ADMIN =====
    if data.role == "admin":
        admin = (
            db.query(Admin)
            .filter(Admin.username == data.username)
            .first()
        )

        if not admin or admin.password != data.password:
            raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")

        return {
            "id": admin.id,
            "name": admin.name,
            "username": admin.username,
            "role": "admin",
        }

    # ===== STUDENT =====
    elif data.role == "student":
        student = (
            db.query(SinhVien)
            .filter(
                (SinhVien.ma_so == data.username) |
                (SinhVien.email == data.username)
            )
            .first()
        )

        # ⚠️ bạn chưa có password trong SinhVien → tạm dùng "1"
        if not student or data.password != "1":
            raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")

        return {
            "id": student.ma_sv,
            "name": student.ho_ten,
            "username": student.ma_so,
            "role": "student",
        }

    # ===== INVALID ROLE =====
    else:
        raise HTTPException(status_code=400, detail="Role không hợp lệ")

    # ===== STUDENT LOGIN (nếu có) =====
    if data.role == "student":
        student = (
            db.query(SinhVien)
            .filter(
                (SinhVien.ma_sv == data.username) | (SinhVien.email == data.username)
            )
            .first()
        )

        if not student or student.password != data.password:
            raise HTTPException(status_code=401, detail="Sai tài khoản hoặc mật khẩu")

        return {
            "id": student.id,
            "name": student.name,
            "username": student.code,
            "role": "student",
        }

    raise HTTPException(status_code=400, detail="Role không hợp lệ")

# ================= STUDENTS =================
@app.get("/students")
def get_students(db: Session = Depends(get_db)):
    students = db.query(SinhVien).all()

    return [
        {
            "ma_sv": s.ma_sv,
            "ma_so": s.ma_so,
            "ho_ten": s.ho_ten,
            "email": s.email,
            "lop": s.lop,
            "khoa": s.khoa,
            "nam_hoc": s.nam_hoc,
            "trang_thai": s.trang_thai,
            "nganh": s.IDNganh
        }
        for s in students
    ]


@app.get("/students/{ma_sv}")
def get_student(ma_sv: str, db: Session = Depends(get_db)):
    sv = db.query(SinhVien).filter(SinhVien.ma_sv == ma_sv).first()

    if not sv:
        raise HTTPException(status_code=404, detail="Student not found")

    grades = (
        db.query(BangDiem, HocPhan)
        .join(HocPhan, BangDiem.ma_hp == HocPhan.MaHocPhan)
        .filter(BangDiem.ma_sv == ma_sv)
        .all()
    )

    return {
        "student": {
            "ma_sv": sv.ma_sv,
            "ho_ten": sv.ho_ten,
            "email": sv.email,
            "lop": sv.lop
        },
        "grades": [
            {
                "ma_hp": hp.MaHocPhan,
                "ten_hp": hp.TenHocPhan,
                "diem_qt": bd.diem_qt,
                "diem_gk": bd.diem_gk,
                "diem_ck": bd.diem_ck,
                "diem_tk": bd.diem_tk,
                "diem_chu": bd.diem_chu
            }
            for bd, hp in grades
        ]
    }


@app.post("/students")
def create_student(data: dict, db: Session = Depends(get_db)):
    sv = SinhVien(
        ma_sv=data["ma_sv"],
        ma_so=data["ma_so"],
        ho_ten=data["ho_ten"],
        email=data["email"],
        lop=data["lop"],
        khoa=data["khoa"],
        nam_hoc=data["nam_hoc"],
        trang_thai=data["trang_thai"],
        IDNganh=data["IDNganh"]
    )

    db.add(sv)
    db.commit()

    return {"message": "created"}


@app.delete("/students/{ma_sv}")
def delete_student(ma_sv: str, db: Session = Depends(get_db)):
    sv = db.query(SinhVien).filter(SinhVien.ma_sv == ma_sv).first()

    if not sv:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(sv)
    db.commit()

    return {"message": "deleted"}


# ================= GRADES =================
@app.get("/grades")
def get_grades(db: Session = Depends(get_db)):
    grades = (
        db.query(BangDiem, HocPhan, SinhVien)
        .join(HocPhan, BangDiem.ma_hp == HocPhan.MaHocPhan)
        .join(SinhVien, BangDiem.ma_sv == SinhVien.ma_sv)
        .all()
    )

    return [
        {
            "ma_sv": sv.ma_sv,
            "ho_ten": sv.ho_ten,
            "ma_hp": hp.MaHocPhan,
            "ten_hp": hp.TenHocPhan,
            "diem_tk": bd.diem_tk,
            "diem_chu": bd.diem_chu
        }
        for bd, hp, sv in grades
    ]


@app.post("/grades")
def add_grade(data: dict, db: Session = Depends(get_db)):

    # check tồn tại
    exists = db.query(BangDiem).filter(
        BangDiem.ma_sv == data["ma_sv"],
        BangDiem.ma_hp == data["ma_hp"]
    ).first()

    if exists:
        raise HTTPException(status_code=400, detail="Grade already exists")

    grade = BangDiem(
        ma_sv=data["ma_sv"],
        ma_hp=data["ma_hp"],
        diem_qt=data["diem_qt"],
        diem_gk=data["diem_gk"],
        diem_ck=data["diem_ck"],
        diem_tk=data["diem_tk"],
        diem_chu=data["diem_chu"]
    )

    db.add(grade)
    db.commit()

    return {"message": "added"}

@app.get("/grades")
def get_grades(db: Session = Depends(get_db)):
    grades = (
        db.query(BangDiem, HocPhan, SinhVien)
        .join(HocPhan, BangDiem.ma_hp == HocPhan.MaHocPhan)
        .join(SinhVien, BangDiem.ma_sv == SinhVien.ma_sv)
        .all()
    )

    return [
        {
            # ✅ FE cần
            "studentId": sv.ma_sv,
            "courseId": hp.MaHocPhan,

            "grade": bd.diem_tk,
            "status": "completed" if bd.diem_tk and bd.diem_tk >= 5 else "failed",
            "semester": "N/A",  # nếu chưa có thì để tạm

            "student": {
                "name": sv.ho_ten,
                "code": sv.ma_so,
            },

            "course": {
                "code": hp.MaHocPhan,
                "name": hp.TenHocPhan,
            }
        }
        for bd, hp, sv in grades
    ]

class UpdateGradeRequest(BaseModel):
    ma_sv: str
    ma_hp: str
    diem_tk: float


@app.put("/grades")
def update_grade(data: UpdateGradeRequest, db: Session = Depends(get_db)):
    record = db.query(BangDiem).filter(
        BangDiem.ma_sv == data.ma_sv,
        BangDiem.ma_hp == data.ma_hp
    ).first()

    if not record:
        raise HTTPException(status_code=404, detail="Không tìm thấy bản ghi")

    record.diem_tk = data.diem_tk

    # 👉 tự tính điểm chữ (nếu bạn muốn)
    if data.diem_tk >= 8.5:
        record.diem_chu = "A"
    elif data.diem_tk >= 7:
        record.diem_chu = "B"
    elif data.diem_tk >= 5:
        record.diem_chu = "C"
    else:
        record.diem_chu = "F"

    db.commit()
    db.refresh(record)

    return {"message": "updated"}