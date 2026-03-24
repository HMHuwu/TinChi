from .database import SessionLocal
from .models import Nganh, HocPhan, SinhVien, BangDiem, Admin
from datetime import date


def seed():
    db = SessionLocal()

    # tránh seed lại
    if db.query(Nganh).first():
        db.close()
        return

    # ================= NGANH =================

    nganh = [
        Nganh(IDNganh="NG01", MaNganh="CNTT", TenNganh="Công nghệ thông tin", TongTinChi=140),
        Nganh(IDNganh="NG02", MaNganh="KTPM", TenNganh="Kỹ thuật phần mềm", TongTinChi=140),
        Nganh(IDNganh="NG03", MaNganh="KHMT", TenNganh="Khoa học máy tính", TongTinChi=135),
        Nganh(IDNganh="NG04", MaNganh="HTTT", TenNganh="Hệ thống thông tin", TongTinChi=138),
        Nganh(IDNganh="NG05", MaNganh="ATTT", TenNganh="An toàn thông tin", TongTinChi=140),
    ]

    db.add_all(nganh)

    # ================= HOCPHAN =================

    hocphan = [
    # CNTT
    HocPhan(IDHocPhan="HP_CN01", MaHocPhan="INT1", TenHocPhan="Nhập môn lập trình", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG01"),
    HocPhan(IDHocPhan="HP_CN02", MaHocPhan="INT2", TenHocPhan="Toán rời rạc", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG01"),
    HocPhan(IDHocPhan="HP_CN03", MaHocPhan="INT3", TenHocPhan="Giải tích", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG01"),
    HocPhan(IDHocPhan="HP_CN04", MaHocPhan="INT4", TenHocPhan="Cấu trúc dữ liệu & Giải thuật", SoTinChi=3, HocKyDeXuat=2, IDNganh="NG01"),

    # KTPM
    HocPhan(IDHocPhan="HP_KT01", MaHocPhan="INT5", TenHocPhan="Nhập môn công nghệ phần mềm", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG02"),
    HocPhan(IDHocPhan="HP_KT02", MaHocPhan="INT6", TenHocPhan="Lập trình cơ bản", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG02"),
    HocPhan(IDHocPhan="HP_KT03", MaHocPhan="INT7", TenHocPhan="Toán cho CNPM", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG02"),

    # KHMT
    HocPhan(IDHocPhan="HP_KH01", MaHocPhan="INT8", TenHocPhan="Nhập môn khoa học máy tính", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG03"),
    HocPhan(IDHocPhan="HP_KH02", MaHocPhan="INT9", TenHocPhan="Toán rời rạc nâng cao", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG03"),

    # HTTT
    HocPhan(IDHocPhan="HP_HT01", MaHocPhan="INT10", TenHocPhan="Nhập môn hệ thống thông tin", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG04"),
    HocPhan(IDHocPhan="HP_HT02", MaHocPhan="INT11", TenHocPhan="Tin học văn phòng nâng cao", SoTinChi=2, HocKyDeXuat=1, IDNganh="NG04"),

    # ATTT
    HocPhan(IDHocPhan="HP_AT01", MaHocPhan="INT12", TenHocPhan="Nhập môn an toàn thông tin", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG05"),
    HocPhan(IDHocPhan="HP_AT02", MaHocPhan="INT13", TenHocPhan="Lập trình C/C++", SoTinChi=3, HocKyDeXuat=1, IDNganh="NG05"),
]

    db.add_all(hocphan)
    db.commit()

        # ================= ADMINS =================
    admins = [
        Admin(username="admin1", password="1", name="Hà Minh Hướng", email="admin1@neu.edu.vn"),
        Admin(username="admin2", password="1", name="Nguyễn Thị Xuân", email="admin2@neu.edu.vn"),
        Admin(username="admin3", password="1", name="Nguyễn Đức Mạnh", email="admin3@neu.edu.vn"),
    ]

    db.add_all(admins)

    sv = sinhvien = [

        # CNTT
        SinhVien(ma_sv="SV001", ma_so="2201001", ho_ten="Nguyễn Văn An", ngay_sinh=date(2004,3,15), gioi_tinh="Nam", lop="CNTT22A", khoa="2022", IDNganh="NG01", nam_hoc=3, trang_thai="Đang học", email="2201001@edu.vn"),
        SinhVien(ma_sv="SV002", ma_so="2201002", ho_ten="Trần Thị Bình", ngay_sinh=date(2004,7,22), gioi_tinh="Nữ", lop="CNTT22A", khoa="2022", IDNganh="NG01", nam_hoc=3, trang_thai="Đang học", email="2201002@edu.vn"),
        SinhVien(ma_sv="SV003", ma_so="2201003", ho_ten="Lê Minh Cường", ngay_sinh=date(2003,11,5), gioi_tinh="Nam", lop="CNTT22B", khoa="2022", IDNganh="NG01", nam_hoc=3, trang_thai="Đang học", email="2201003@edu.vn"),
        SinhVien(ma_sv="SV004", ma_so="2201004", ho_ten="Phạm Thị Dung", ngay_sinh=date(2004,1,18), gioi_tinh="Nữ", lop="CNTT22B", khoa="2022", IDNganh="NG01", nam_hoc=2, trang_thai="Đang học", email="2201004@edu.vn"),
        SinhVien(ma_sv="SV005", ma_so="2201005", ho_ten="Hoàng Văn Em", ngay_sinh=date(2003,9,30), gioi_tinh="Nam", lop="CNTT22A", khoa="2022", IDNganh="NG01", nam_hoc=3, trang_thai="Bảo lưu", email="2201005@edu.vn"),
        SinhVien(ma_sv="SV006", ma_so="2201006", ho_ten="Vũ Thị Phương", ngay_sinh=date(2004,5,12), gioi_tinh="Nữ", lop="CNTT22A", khoa="2022", IDNganh="NG01", nam_hoc=3, trang_thai="Đang học", email="2201006@edu.vn"),

        # KTPM
        SinhVien(ma_sv="SV007", ma_so="2202001", ho_ten="Đặng Quốc Hùng", ngay_sinh=date(2004,2,28), gioi_tinh="Nam", lop="KTPM22A", khoa="2022", IDNganh="NG02", nam_hoc=3, trang_thai="Đang học", email="2202001@edu.vn"),
        SinhVien(ma_sv="SV008", ma_so="2202002", ho_ten="Bùi Thị Thu", ngay_sinh=date(2003,12,10), gioi_tinh="Nữ", lop="KTPM22A", khoa="2022", IDNganh="NG02", nam_hoc=3, trang_thai="Đang học", email="2202002@edu.vn"),
        SinhVien(ma_sv="SV009", ma_so="2202003", ho_ten="Ngô Văn Khoa", ngay_sinh=date(2004,8,19), gioi_tinh="Nam", lop="KTPM22B", khoa="2022", IDNganh="NG02", nam_hoc=2, trang_thai="Đang học", email="2202003@edu.vn"),
        SinhVien(ma_sv="SV010", ma_so="2202004", ho_ten="Trịnh Thị Lan", ngay_sinh=date(2004,4,3), gioi_tinh="Nữ", lop="KTPM22B", khoa="2022", IDNganh="NG02", nam_hoc=3, trang_thai="Đang học", email="2202004@edu.vn"),
        SinhVien(ma_sv="SV011", ma_so="2202005", ho_ten="Phan Minh Long", ngay_sinh=date(2003,6,25), gioi_tinh="Nam", lop="KTPM22A", khoa="2022", IDNganh="NG02", nam_hoc=3, trang_thai="Đang học", email="2202005@edu.vn"),
        SinhVien(ma_sv="SV012", ma_so="2202006", ho_ten="Lý Thị Mỹ", ngay_sinh=date(2004,10,7), gioi_tinh="Nữ", lop="KTPM22A", khoa="2022", IDNganh="NG02", nam_hoc=2, trang_thai="Đang học", email="2202006@edu.vn"),

        # KHMT
        SinhVien(ma_sv="SV013", ma_so="2203001", ho_ten="Hồ Văn Nam", ngay_sinh=date(2003,7,14), gioi_tinh="Nam", lop="KHMT22A", khoa="2022", IDNganh="NG03", nam_hoc=3, trang_thai="Đang học", email="2203001@edu.vn"),
        SinhVien(ma_sv="SV014", ma_so="2203002", ho_ten="Tô Thị Oanh", ngay_sinh=date(2004,9,1), gioi_tinh="Nữ", lop="KHMT22A", khoa="2022", IDNganh="NG03", nam_hoc=3, trang_thai="Đang học", email="2203002@edu.vn"),
        SinhVien(ma_sv="SV015", ma_so="2203003", ho_ten="Đinh Công Phúc", ngay_sinh=date(2003,3,20), gioi_tinh="Nam", lop="KHMT22B", khoa="2022", IDNganh="NG03", nam_hoc=3, trang_thai="Đang học", email="2203003@edu.vn"),
        SinhVien(ma_sv="SV016", ma_so="2203004", ho_ten="Dương Thị Quỳnh", ngay_sinh=date(2004,11,30), gioi_tinh="Nữ", lop="KHMT22B", khoa="2022", IDNganh="NG03", nam_hoc=2, trang_thai="Đang học", email="2203004@edu.vn"),
        SinhVien(ma_sv="SV017", ma_so="2203005", ho_ten="Mai Văn Sơn", ngay_sinh=date(2003,5,8), gioi_tinh="Nam", lop="KHMT22A", khoa="2022", IDNganh="NG03", nam_hoc=3, trang_thai="Đang học", email="2203005@edu.vn"),
        SinhVien(ma_sv="SV018", ma_so="2203006", ho_ten="Cao Thị Thanh", ngay_sinh=date(2004,6,17), gioi_tinh="Nữ", lop="KHMT22A", khoa="2022", IDNganh="NG03", nam_hoc=3, trang_thai="Đang học", email="2203006@edu.vn"),

        # HTTT
        SinhVien(ma_sv="SV019", ma_so="2204001", ho_ten="Lưu Minh Tuấn", ngay_sinh=date(2003,8,22), gioi_tinh="Nam", lop="HTTT22A", khoa="2022", IDNganh="NG04", nam_hoc=3, trang_thai="Đang học", email="2204001@edu.vn"),
        SinhVien(ma_sv="SV020", ma_so="2204002", ho_ten="Tạ Thị Uyên", ngay_sinh=date(2004,12,5), gioi_tinh="Nữ", lop="HTTT22A", khoa="2022", IDNganh="NG04", nam_hoc=2, trang_thai="Đang học", email="2204002@edu.vn"),
        SinhVien(ma_sv="SV021", ma_so="2204003", ho_ten="Châu Văn Vinh", ngay_sinh=date(2004,1,9), gioi_tinh="Nam", lop="HTTT22B", khoa="2022", IDNganh="NG04", nam_hoc=3, trang_thai="Đang học", email="2204003@edu.vn"),
        SinhVien(ma_sv="SV022", ma_so="2204004", ho_ten="Trương Thị Xuân", ngay_sinh=date(2004,3,26), gioi_tinh="Nữ", lop="HTTT22B", khoa="2022", IDNganh="NG04", nam_hoc=3, trang_thai="Đang học", email="2204004@edu.vn"),
        SinhVien(ma_sv="SV023", ma_so="2204005", ho_ten="Huỳnh Văn Yên", ngay_sinh=date(2003,10,13), gioi_tinh="Nam", lop="HTTT22A", khoa="2022", IDNganh="NG04", nam_hoc=3, trang_thai="Đang học", email="2204005@edu.vn"),
        SinhVien(ma_sv="SV024", ma_so="2204006", ho_ten="Lâm Thị Zung", ngay_sinh=date(2004,7,4), gioi_tinh="Nữ", lop="HTTT22A", khoa="2022", IDNganh="NG04", nam_hoc=2, trang_thai="Đang học", email="2204006@edu.vn"),

        # ATTT
        SinhVien(ma_sv="SV025", ma_so="2205001", ho_ten="Võ Hoàng Anh", ngay_sinh=date(2003,4,18), gioi_tinh="Nam", lop="ATTT22A", khoa="2022", IDNganh="NG05", nam_hoc=3, trang_thai="Đang học", email="2205001@edu.vn"),
        SinhVien(ma_sv="SV026", ma_so="2205002", ho_ten="Đỗ Thị Bảo", ngay_sinh=date(2005,2,11), gioi_tinh="Nữ", lop="ATTT22A", khoa="2022", IDNganh="NG05", nam_hoc=3, trang_thai="Đang học", email="2205002@edu.vn"),
        SinhVien(ma_sv="SV027", ma_so="2205003", ho_ten="Kiều Văn Chi", ngay_sinh=date(2004,6,29), gioi_tinh="Nam", lop="ATTT22B", khoa="2022", IDNganh="NG05", nam_hoc=3, trang_thai="Đang học", email="2205003@edu.vn"),
        SinhVien(ma_sv="SV028", ma_so="2205004", ho_ten="Lê Thị Diệu", ngay_sinh=date(2004,9,15), gioi_tinh="Nữ", lop="ATTT22B", khoa="2022", IDNganh="NG05", nam_hoc=2, trang_thai="Đang học", email="2205004@edu.vn"),
        SinhVien(ma_sv="SV029", ma_so="2205005", ho_ten="Phùng Minh Đức", ngay_sinh=date(2003,11,2), gioi_tinh="Nam", lop="ATTT22A", khoa="2022", IDNganh="NG05", nam_hoc=3, trang_thai="Đang học", email="2205005@edu.vn"),
        SinhVien(ma_sv="SV030", ma_so="2205006", ho_ten="Nguyễn Thị Giang", ngay_sinh=date(2004,4,7), gioi_tinh="Nữ", lop="ATTT22A", khoa="2022", IDNganh="NG05", nam_hoc=3, trang_thai="Đang học", email="2205006@edu.vn"),
    ]

    db.add_all(sv)

        # ================= BẢNG ĐIỂM =================
    bangdiem = [

    # SV001
    BangDiem(ma_sv="SV001",ma_hp="INT3",diem_qt=8.5,diem_gk=7.5,diem_ck=8.0,diem_tk=8.0,diem_chu="B"),
    BangDiem(ma_sv="SV001",ma_hp="INT7",diem_qt=7.0,diem_gk=8.0,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),
    BangDiem(ma_sv="SV001",ma_hp="INT13",diem_qt=9.0,diem_gk=8.5,diem_ck=8.5,diem_tk=8.7,diem_chu="A"),
    BangDiem(ma_sv="SV001",ma_hp="INT11",diem_qt=8.0,diem_gk=7.0,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),

    # SV002
    BangDiem(ma_sv="SV002",ma_hp="INT11",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C"),
    BangDiem(ma_sv="SV002",ma_hp="INT13",diem_qt=8.0,diem_gk=7.5,diem_ck=8.0,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV002",ma_hp="INT1",diem_qt=7.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV002",ma_hp="INT2",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),

    # SV003
    BangDiem(ma_sv="SV003",ma_hp="INT11",diem_qt=9.0,diem_gk=9.0,diem_ck=8.5,diem_tk=8.8,diem_chu="A"),
    BangDiem(ma_sv="SV003",ma_hp="INT13",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV003",ma_hp="INT2",diem_qt=7.5,diem_gk=7.5,diem_ck=8.0,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV003",ma_hp="INT1",diem_qt=8.0,diem_gk=8.0,diem_ck=8.5,diem_tk=8.2,diem_chu="B+"),

    # SV004
    BangDiem(ma_sv="SV004",ma_hp="INT11",diem_qt=5.5,diem_gk=6.0,diem_ck=6.5,diem_tk=6.0,diem_chu="C"),
    BangDiem(ma_sv="SV004",ma_hp="INT13",diem_qt=7.0,diem_gk=6.5,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV004",ma_hp="INT13",diem_qt=8.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV004",ma_hp="INT11",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),

    # SV005
    BangDiem(ma_sv="SV005",ma_hp="INT11",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV005",ma_hp="INT13",diem_qt=7.5,diem_gk=7.0,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV005",ma_hp="INT13",diem_qt=9.0,diem_gk=8.5,diem_ck=8.5,diem_tk=8.7,diem_chu="A"),
    BangDiem(ma_sv="SV005",ma_hp="INT11",diem_qt=8.0,diem_gk=8.0,diem_ck=7.5,diem_tk=7.8,diem_chu="B"),

    # SV006
    BangDiem(ma_sv="SV006",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=7.0,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV006",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV006",ma_hp="INT13",diem_qt=7.0,diem_gk=7.0,diem_ck=7.5,diem_tk=7.2,diem_chu="B"),
    BangDiem(ma_sv="SV006",ma_hp="INT11",diem_qt=8.5,diem_gk=8.5,diem_ck=8.0,diem_tk=8.3,diem_chu="B+"),

    # SV007
    BangDiem(ma_sv="SV007",ma_hp="INT11",diem_qt=9.0,diem_gk=8.5,diem_ck=8.5,diem_tk=8.7,diem_chu="A"),
    BangDiem(ma_sv="SV007",ma_hp="INT13",diem_qt=8.5,diem_gk=8.5,diem_ck=8.0,diem_tk=8.3,diem_chu="B+"),
    BangDiem(ma_sv="SV007",ma_hp="INT13",diem_qt=7.5,diem_gk=8.0,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV007",ma_hp="INT11",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),

    # SV008
    BangDiem(ma_sv="SV008",ma_hp="INT11",diem_qt=6.0,diem_gk=6.5,diem_ck=7.0,diem_tk=6.5,diem_chu="C"),
    BangDiem(ma_sv="SV008",ma_hp="INT13",diem_qt=7.0,diem_gk=7.5,diem_ck=7.0,diem_tk=7.2,diem_chu="B"),
    BangDiem(ma_sv="SV008",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=7.5,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV008",ma_hp="INT11",diem_qt=7.5,diem_gk=7.0,diem_ck=7.0,diem_tk=7.2,diem_chu="B"),

    # SV009
    BangDiem(ma_sv="SV009",ma_hp="INT11",diem_qt=8.0,diem_gk=7.5,diem_ck=8.0,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV009",ma_hp="INT13",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),
    BangDiem(ma_sv="SV009",ma_hp="INT13",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV009",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.5,diem_tk=7.2,diem_chu="B"),

    # SV010
    BangDiem(ma_sv="SV010",ma_hp="INT11",diem_qt=9.5,diem_gk=9.0,diem_ck=9.0,diem_tk=9.2,diem_chu="A"),
    BangDiem(ma_sv="SV010",ma_hp="INT13",diem_qt=8.5,diem_gk=8.5,diem_ck=8.5,diem_tk=8.5,diem_chu="A"),
    BangDiem(ma_sv="SV010",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV010",ma_hp="INT11",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),

    # SV011
    BangDiem(ma_sv="SV011",ma_hp="INT11",diem_qt=7.5,diem_gk=7.0,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV011",ma_hp="INT13",diem_qt=8.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV011",ma_hp="INT13",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV011",ma_hp="INT11",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),

    # SV012
    BangDiem(ma_sv="SV012",ma_hp="INT11",diem_qt=6.0,diem_gk=6.5,diem_ck=7.0,diem_tk=6.5,diem_chu="C"),
    BangDiem(ma_sv="SV012",ma_hp="INT13",diem_qt=7.5,diem_gk=7.0,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV012",ma_hp="INT13",diem_qt=8.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV012",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.0,diem_tk=7.0,diem_chu="B"),

    # SV013
    BangDiem(ma_sv="SV013",ma_hp="INT11",diem_qt=9.0,diem_gk=8.5,diem_ck=8.5,diem_tk=8.7,diem_chu="A"),
    BangDiem(ma_sv="SV013",ma_hp="INT13",diem_qt=8.5,diem_gk=8.0,diem_ck=8.5,diem_tk=8.3,diem_chu="B+"),
    BangDiem(ma_sv="SV013",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV013",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),

    # SV014
    BangDiem(ma_sv="SV014",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.0,diem_tk=7.0,diem_chu="B"),
    BangDiem(ma_sv="SV014",ma_hp="INT13",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV014",ma_hp="INT13",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV014",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=8.0,diem_tk=7.7,diem_chu="B"),

    # SV015
    BangDiem(ma_sv="SV015",ma_hp="INT11",diem_qt=8.0,diem_gk=8.0,diem_ck=7.5,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV015",ma_hp="INT13",diem_qt=8.5,diem_gk=8.5,diem_ck=8.0,diem_tk=8.3,diem_chu="B+"),
    BangDiem(ma_sv="SV015",ma_hp="INT13",diem_qt=7.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV015",ma_hp="INT11",diem_qt=9.0,diem_gk=8.5,diem_ck=8.5,diem_tk=8.7,diem_chu="A"),

    # SV016
    BangDiem(ma_sv="SV016",ma_hp="INT11",diem_qt=6.5,diem_gk=6.5,diem_ck=7.0,diem_tk=6.7,diem_chu="C+"),
    BangDiem(ma_sv="SV016",ma_hp="INT13",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),
    BangDiem(ma_sv="SV016",ma_hp="INT13",diem_qt=8.0,diem_gk=7.5,diem_ck=8.0,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV016",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.0,diem_tk=7.0,diem_chu="B"),

    # SV017
    BangDiem(ma_sv="SV017",ma_hp="INT11",diem_qt=9.0,diem_gk=9.0,diem_ck=8.5,diem_tk=8.8,diem_chu="A"),
    BangDiem(ma_sv="SV017",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV017",ma_hp="INT13",diem_qt=7.5,diem_gk=8.0,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV017",ma_hp="INT11",diem_qt=8.5,diem_gk=8.0,diem_ck=8.5,diem_tk=8.3,diem_chu="B+"),

    # SV018
    BangDiem(ma_sv="SV018",ma_hp="INT11",diem_qt=5.5,diem_gk=6.0,diem_ck=6.5,diem_tk=6.0,diem_chu="C"),
    BangDiem(ma_sv="SV018",ma_hp="INT13",diem_qt=6.5,diem_gk=7.0,diem_ck=6.5,diem_tk=6.7,diem_chu="C+"),
    BangDiem(ma_sv="SV018",ma_hp="INT13",diem_qt=7.5,diem_gk=7.5,diem_ck=7.0,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV018",ma_hp="INT11",diem_qt=8.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),

    # SV019
    BangDiem(ma_sv="SV019",ma_hp="INT11",diem_qt=8.5,diem_gk=8.0,diem_ck=8.0,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV019",ma_hp="INT13",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),
    BangDiem(ma_sv="SV019",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.5,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV019",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.5,diem_tk=7.2,diem_chu="B"),

    # SV020
    BangDiem(ma_sv="SV020",ma_hp="INT11",diem_qt=7.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV020",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV020",ma_hp="INT13",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV020",ma_hp="INT11",diem_qt=8.5,diem_gk=8.5,diem_ck=8.0,diem_tk=8.3,diem_chu="B+"),

    # SV021
    BangDiem(ma_sv="SV021",ma_hp="INT11",diem_qt=9.0,diem_gk=8.5,diem_ck=9.0,diem_tk=8.8,diem_chu="A"),
    BangDiem(ma_sv="SV021",ma_hp="INT13",diem_qt=8.5,diem_gk=8.0,diem_ck=8.5,diem_tk=8.3,diem_chu="B+"),
    BangDiem(ma_sv="SV021",ma_hp="INT13",diem_qt=7.5,diem_gk=7.5,diem_ck=8.0,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV021",ma_hp="INT11",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),

    # SV022
    BangDiem(ma_sv="SV022",ma_hp="INT11",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV022",ma_hp="INT13",diem_qt=7.0,diem_gk=7.0,diem_ck=7.5,diem_tk=7.2,diem_chu="B"),
    BangDiem(ma_sv="SV022",ma_hp="INT13",diem_qt=8.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),
    BangDiem(ma_sv="SV022",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=7.0,diem_tk=7.3,diem_chu="B"),

    # SV023
    BangDiem(ma_sv="SV023",ma_hp="INT11",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV023",ma_hp="INT13",diem_qt=8.5,diem_gk=8.5,diem_ck=8.5,diem_tk=8.5,diem_chu="A"),
    BangDiem(ma_sv="SV023",ma_hp="INT13",diem_qt=7.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV023",ma_hp="INT11",diem_qt=8.0,diem_gk=7.5,diem_ck=8.0,diem_tk=7.8,diem_chu="B"),

    # SV024
    BangDiem(ma_sv="SV024",ma_hp="INT11",diem_qt=5.5,diem_gk=6.0,diem_ck=6.5,diem_tk=6.0,diem_chu="C"),
    BangDiem(ma_sv="SV024",ma_hp="INT13",diem_qt=6.5,diem_gk=6.5,diem_ck=7.0,diem_tk=6.7,diem_chu="C+"),
    BangDiem(ma_sv="SV024",ma_hp="INT13",diem_qt=7.5,diem_gk=7.0,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV024",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.0,diem_tk=7.0,diem_chu="B"),

    # SV025
    BangDiem(ma_sv="SV025",ma_hp="INT11",diem_qt=8.5,diem_gk=8.5,diem_ck=8.0,diem_tk=8.3,diem_chu="B+"),
    BangDiem(ma_sv="SV025",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV025",ma_hp="INT13",diem_qt=9.0,diem_gk=8.5,diem_ck=8.5,diem_tk=8.7,diem_chu="A"),
    BangDiem(ma_sv="SV025",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),

    # SV026
    BangDiem(ma_sv="SV026",ma_hp="INT11",diem_qt=7.0,diem_gk=7.0,diem_ck=7.5,diem_tk=7.2,diem_chu="B"),
    BangDiem(ma_sv="SV026",ma_hp="INT13",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV026",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=7.5,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV026",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=7.0,diem_tk=7.3,diem_chu="B"),

    # SV027
    BangDiem(ma_sv="SV027",ma_hp="INT11",diem_qt=9.0,diem_gk=9.0,diem_ck=9.0,diem_tk=9.0,diem_chu="A"),
    BangDiem(ma_sv="SV027",ma_hp="INT13",diem_qt=8.5,diem_gk=8.5,diem_ck=8.5,diem_tk=8.5,diem_chu="A"),
    BangDiem(ma_sv="SV027",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.5,diem_tk=8.2,diem_chu="B+"),
    BangDiem(ma_sv="SV027",ma_hp="INT11",diem_qt=8.5,diem_gk=8.0,diem_ck=8.5,diem_tk=8.3,diem_chu="B+"),

    # SV028
    BangDiem(ma_sv="SV028",ma_hp="INT11",diem_qt=6.5,diem_gk=6.5,diem_ck=7.0,diem_tk=6.7,diem_chu="C+"),
    BangDiem(ma_sv="SV028",ma_hp="INT13",diem_qt=7.0,diem_gk=7.5,diem_ck=7.0,diem_tk=7.2,diem_chu="B"),
    BangDiem(ma_sv="SV028",ma_hp="INT13",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),
    BangDiem(ma_sv="SV028",ma_hp="INT11",diem_qt=8.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.7,diem_chu="B"),

    # SV029
    BangDiem(ma_sv="SV029",ma_hp="INT11",diem_qt=8.0,diem_gk=7.5,diem_ck=8.0,diem_tk=7.8,diem_chu="B"),
    BangDiem(ma_sv="SV029",ma_hp="INT13",diem_qt=8.5,diem_gk=8.0,diem_ck=8.5,diem_tk=8.3,diem_chu="B+"),
    BangDiem(ma_sv="SV029",ma_hp="INT13",diem_qt=7.0,diem_gk=7.5,diem_ck=7.5,diem_tk=7.3,diem_chu="B"),
    BangDiem(ma_sv="SV029",ma_hp="INT11",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),

    # SV030
    BangDiem(ma_sv="SV030",ma_hp="INT11",diem_qt=7.5,diem_gk=7.5,diem_ck=7.5,diem_tk=7.5,diem_chu="B"),
    BangDiem(ma_sv="SV030",ma_hp="INT13",diem_qt=8.0,diem_gk=8.0,diem_ck=8.0,diem_tk=8.0,diem_chu="B+"),
    BangDiem(ma_sv="SV030",ma_hp="INT13",diem_qt=6.5,diem_gk=7.0,diem_ck=7.0,diem_tk=6.8,diem_chu="C+"),
    BangDiem(ma_sv="SV030",ma_hp="INT11",diem_qt=8.5,diem_gk=8.5,diem_ck=8.0,diem_tk=8.3,diem_chu="B+"),

    ]
    
    db.add_all(bangdiem)

    db.commit()
    db.close()