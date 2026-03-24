from pydantic import BaseModel

from sqlalchemy import Column, String, Integer, Date, ForeignKey, DECIMAL, CheckConstraint, UniqueConstraint, Float
from sqlalchemy.orm import relationship
from .database import Base


# ============================================================
# BẢNG NGÀNH
# ============================================================

class Nganh(Base):
    __tablename__ = "nganh"

    IDNganh = Column(String(10), primary_key=True)
    MaNganh = Column(String(20), unique=True, nullable=False)
    TenNganh = Column(String(200), nullable=False)
    Khoa = Column(String(100), default="Công nghệ thông tin")
    TongTinChi = Column(Integer, default=140)
    MoTa = Column(String)

    hocphans = relationship("HocPhan", back_populates="nganh")
    sinhviens = relationship("SinhVien", back_populates="nganh")


# ============================================================
# BẢNG HỌC PHẦN
# ============================================================

class HocPhan(Base):
    __tablename__ = "hocphan"

    IDHocPhan = Column(String(10), primary_key=True)
    MaHocPhan = Column(String(20), unique=True, nullable=False)
    TenHocPhan = Column(String(200), nullable=False)

    SoTinChi = Column(Integer, default=3)
    HocKyDeXuat = Column(Integer, default=1)
    LoaiMon = Column(String(30), default="Bắt buộc")

    IDNganh = Column(String(10), ForeignKey("nganh.IDNganh"))

    nganh = relationship("Nganh", back_populates="hocphans")
    bangdiems = relationship("BangDiem", back_populates="hocphan")


# ============================================================
# BẢNG SINH VIÊN
# ============================================================

class SinhVien(Base):
    __tablename__ = "sinhvien"

    ma_sv = Column(String(20), primary_key=True)

    IDNganh = Column(String(10), ForeignKey("nganh.IDNganh"))

    ma_so = Column(String(20))
    ho_ten = Column(String(200))
    ngay_sinh = Column(Date)
    gioi_tinh = Column(String(10))
    lop = Column(String(50))
    khoa = Column(String(20))
    nam_hoc = Column(Integer)
    trang_thai = Column(String(50))
    email = Column(String(100))

    nganh = relationship("Nganh", back_populates="sinhviens")
    bangdiems = relationship("BangDiem", back_populates="sinhvien")


# ============================================================
# BẢNG ĐIỂM
# ============================================================

class BangDiem(Base):
    __tablename__ = "bangdiem"

    ma_sv = Column(String(20), ForeignKey("sinhvien.ma_sv"), primary_key=True)
    ma_hp = Column(String(20), ForeignKey("hocphan.MaHocPhan"), primary_key=True)

    diem_qt = Column(Float)
    diem_gk = Column(Float)
    diem_ck = Column(Float)
    diem_tk = Column(Float)
    diem_chu = Column(String(2))

    sinhvien = relationship("SinhVien", back_populates="bangdiems")
    hocphan = relationship("HocPhan", back_populates="bangdiems")

# ============================================================
# BẢNG Admin
# ============================================================

class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(50), nullable=False)

    name = Column(String(100))
    email = Column(String(100))

class BangDiemCreate(BaseModel):
    ma_sv: str
    ma_hp: str
    diem_qt: float
    diem_gk: float
    diem_ck: float
    diem_tk: float
    diem_chu: str