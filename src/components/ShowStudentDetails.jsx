import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate, useSearchParams} from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';

const ShowStudentDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [student, setStudent] = useState({});
  const {id} = useParams();
  const navigate= useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log("Lỗi khi lấy thông tin học sinh", error);
      })
  }, [id])

  const onDeleteClick = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/${id}`)
      .then((response) => {
        toast.success("Xóa học sinh thành công!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Có lỗi khi xóa học sinh!");
        console.log("Lỗi khi xóa học sinh", error);
      })
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    onDeleteClick(student._id);
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <Link
          to={`/?page=${page}`}
          className="text-pink-400 hover:text-pink-300 transition-colors duration-300 text-lg font-semibold flex items-center gap-2 mb-6"
        >
          ← Trở về trang chủ
        </Link>
        <div className="relative mb-6">
          <img src={student.image} alt={student.name} className="w-full h-96 object-cover rounded-lg shadow-lg"/>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 rounded-lg"></div>
        </div>
        <div className="text-white space-y-4">
          <p className="text-lg">
            <span className="font-semibold text-pink-200">Tên thường gọi:</span> {student.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-pink-200">Tên đầy đủ:</span> {student.fullName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-pink-200">Quốc tịch:</span> {student.nationallity}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-pink-200">Nhóm:</span> {student.group || "Không"}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-pink-200">Sinh nhật:</span> {formatDate(student.birthday)}
          </p>
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={handleDeleteClick}
              className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-red-500/50"
            >
              Xóa học sinh
            </button>
            <Link
              to={`/update/${student._id}/?page=${page}`}
              className="flex-1 bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-pink-500/50 text-center"
            >
              Sửa học sinh
            </Link>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Xác nhận xóa
            </h3>
            <p className="text-pink-200 text-center mb-6">
              Bạn có chắc muốn xóa học sinh <span className="font-semibold">{student.name}</span> không?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-red-500/50"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowStudentDetails
