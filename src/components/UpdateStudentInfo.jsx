import {useState, useEffect} from 'react';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateStudentInfo = () => {
  const [student, setStudent] = useState({name: "", fullName: "", group: "", image: "", birthday: "", nationallity: ""});
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/${id}`)
      .then((response) => {
        setStudent({
          name: response.data.name,
          fullName: response.data.fullName,
          group: response.data.group,
          image: response.data.image,
          birthday: response.data.birthday,
          nationallity: response.data.nationallity
        })
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy thông tin học sinh", error);
      })
  }, [id])

  const onChange = (e) => {
    setStudent({...student, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: student.name,
      fullName: student.fullName,
      group: student.group,
      image: student.image,
      birthday: student.birthday,
      nationallity: student.nationallity
    }
    axios
      .put(`${import.meta.env.VITE_API_URL}/${id}`, data)
      .then((response) => {
        toast.success("Cập nhật học sinh thành công!");
        navigate(`/details/${id}?page=${page}`);
      })
      .catch((error) => {
        toast.error("Có lỗi khi sửa học sinh!");
        console.log('Có lỗi khi cập nhật học sinh', error);
      });
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-6">
      <div className="max-w-lg w-full bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl p-8">
        <Link
          to={`/details/${id}?page=${page}`}
          className="text-pink-400 hover:text-pink-300 transition-colors duration-300 text-lg font-semibold flex items-center gap-2 mb-6"
        >
          ← Trở lại chi tiết
        </Link>
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          🌸 Cập nhật thông tin học sinh 🌸
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-pink-200 font-medium mb-2">Tên học sinh:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={onChange}
              placeholder="VD: Lisa"
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-pink-200 font-medium mb-2">Tên đầy đủ:</label>
            <input
              type="text"
              name="fullName"
              value={student.fullName}
              onChange={onChange}
              placeholder="VD: Lalisa Manobal"
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-pink-200 font-medium mb-2">Nhóm:</label>
            <input
              type="text"
              name="group"
              value={student.group}
              onChange={onChange}
              placeholder="VD: Blackpink"
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-pink-200 font-medium mb-2">Link ảnh đại diện:</label>
            <input
              type="text"
              name="image"
              value={student.image}
              onChange={onChange}
              placeholder="VD: https://..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-pink-200 font-medium mb-2">Sinh nhật:</label>
            <input
              type="text"
              name="birthday"
              value={student.birthday}
              onChange={onChange}
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-pink-200 font-medium mb-2">Quốc tịch:</label>
            <input
              type="text"
              name="nationality"
              value={student.nationallity}
              onChange={onChange}
              placeholder="VD: Thái Lan"
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-pink-500/50"
          >
            🌷 Cập nhật 🌷
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateStudentInfo
