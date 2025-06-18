import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import { useNavigate } from "react-router-dom";

const ShowStudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const studentsPerPage = 20;
  
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const navigate= useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy danh sách học sinh", error);
      });
  }, []);

  // Hàm tính tuổi từ birthday
  const calculateAge = (birthday) => {
    if (!birthday) return 0;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Hàm sort students
  const sortStudents = (studentsToSort) => {
    if (!sortOption) return studentsToSort;

    return [...studentsToSort].sort((a, b) => {
      switch (sortOption) {
        case "age-desc": // Tuổi từ lớn đến bé
          return calculateAge(b.birthday) - calculateAge(a.birthday);
        case "age-asc": // Tuổi từ bé đến lớn
          return calculateAge(a.birthday) - calculateAge(b.birthday);
        case "name-asc": // Tên từ A đến Z
          return (a.name).localeCompare(b.name);
        case "name-desc": // Tên từ Z đến A
          return (b.name).localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(search) ||
      student.fullName.toLowerCase().includes(search) ||
      student.group.toLowerCase().includes(search)
    );
  });
  
  // Sort filtered students
  const sortedStudents = sortStudents(filteredStudents);
  
  const endIndex = startIndex + studentsPerPage;
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);
  const currentStudents = sortedStudents.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    navigate(`/?page=${page}`);
    scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  const studentList =
    currentStudents.length === 0 ? (
      <p className="text-pink-200 text-lg text-center">Không có học sinh nào cả</p>
    ) : (
      <div className="grid items-center grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6">
        {currentStudents.map((student, index) => (
          <StudentCard student={student} key={index} currentPage={currentPage} />
        ))}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-pink-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8 tracking-widest font-blackpink">
          🎤 Danh sách học sinh 🎶
        </h2>

        <div className="flex justify-center mb-10">
          <Link
            to={"/create"}
            className="bg-pink-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-lg hover:shadow-pink-500/50"
          >
            Thêm học sinh mới
          </Link>
        </div>

        {/* Search và Sort container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          {/* Search input */}
          <input
            type="text"
            placeholder="Tìm theo tên, nhóm, tên đầy đủ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full max-w-md px-4 py-3 rounded-full bg-black text-white placeholder-pink-300 border border-pink-600 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300"
          />

          {/* Sort select */}
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-3 rounded-full bg-black text-white border border-pink-600 focus:ring-2 focus:ring-pink-400 outline-none transition-all duration-300 cursor-pointer min-w-[200px]"
          >
            <option value="" className="bg-black text-white">Sắp xếp theo</option>
            <option value="age-desc" className="bg-black text-white">Tuổi: Lớn đến bé</option>
            <option value="age-asc" className="bg-black text-white">Tuổi: Bé đến lớn</option>
            <option value="name-asc" className="bg-black text-white">Tên: A đến Z</option>
            <option value="name-desc" className="bg-black text-white">Tên: Z đến A</option>
          </select>
        </div>

        <div>{studentList}</div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center space-x-2 flex-wrap">
            {/* Nút Prev */}
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageClick(currentPage - 1)}
              className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                currentPage === 1
                  ? "bg-gray-600 text-white opacity-50 cursor-not-allowed"
                  : "bg-black text-pink-400 hover:bg-pink-700 hover:text-white"
              }`}
            >
              Trước
            </button>

            {/* Số trang */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-4 py-2 rounded-full font-semibold border transition-all cursor-pointer ${
                  page === currentPage
                    ? "bg-pink-600 text-white border-pink-400 scale-105"
                    : "bg-black text-pink-400 border-pink-600 hover:bg-pink-700 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Nút Next */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageClick(currentPage + 1)}
              className={`px-4 py-2 rounded-full font-semibold transition-all cursor-pointer ${
                currentPage === totalPages
                  ? "bg-gray-600 text-white opacity-50 cursor-not-allowed"
                  : "bg-black text-pink-400 hover:bg-pink-700 hover:text-white"
              }`}
            >
              Sau
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowStudentList;