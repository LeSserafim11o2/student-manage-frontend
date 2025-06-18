import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateStudent = () => {
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "", fullName: "", group: "", image: "", birthday: "", nationallity: ""
    })

    const onChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}`, student);
            setStudent({ name: "", fullName: "", group: "", image: "", birthday: "", nationallity: "" });
            toast.success("Thêm học sinh thành công!");

            const res = await axios.get(`${import.meta.env.VITE_API_URL}`);
            const totalStudents = res.data.length;

            const studentsPerPage = 20;
            const lastPage = Math.ceil(totalStudents / studentsPerPage);

            navigate(`/?page=${lastPage}`);
        } catch (error) {
            toast.error("Có lỗi khi thêm học sinh, thử lại nha!");
            console.log("Có lỗi xảy ra khi tạo học sinh mới", error);
  }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                <Link
                to="/"
                className="text-pink-400 hover:text-pink-300 transition-colors duration-300 text-lg font-semibold flex items-center gap-2 mb-6"
                >
                ← Về trang chủ
                </Link>
                <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-8 tracking-wide">
                    🌸 Thêm học sinh mới 🌸
                </h1>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="flex flex-col">
                    <label className="text-pink-200 font-medium mb-2">Tên của học sinh:</label>
                    <input
                        name="name"
                        type="text"
                        value={student.name}
                        onChange={onChange}
                        placeholder="VD: Kazuha"
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label className="text-pink-200 font-medium mb-2">Tên đầy đủ:</label>
                    <input
                        name="fullName"
                        type="text"
                        value={student.fullName}
                        onChange={onChange}
                        placeholder="VD: Nakamura Kazuha"
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label className="text-pink-200 font-medium mb-2">Lớp của học sinh:</label>
                    <input
                        name="group"
                        type="text"
                        value={student.group}
                        onChange={onChange}
                        placeholder="VD: Le Sserafim"
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label className="text-pink-200 font-medium mb-2">Liên kết ảnh đại diện:</label>
                    <input
                        name="image"
                        type="text"
                        value={student.image}
                        onChange={onChange}
                        placeholder="https://..."
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label className="text-pink-200 font-medium mb-2">Sinh nhật:</label>
                    <input
                        name="birthday"
                        type="date"
                        value={student.birthday}
                        onChange={onChange}
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                    />
                    </div>

                    <div className="flex flex-col">
                    <label className="text-pink-200 font-medium mb-2">Quốc tịch:</label>
                    <input
                        name="nationallity"
                        type="text"
                        value={student.nationallity}
                        onChange={onChange}
                        placeholder="VD: Hàn Quốc"
                        className="bg-gray-700 text-white placeholder-gray-400 rounded-lg p-3 focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all duration-300"
                    />
                    </div>

                    <button
                    type="submit"
                    className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-pink-500/50"
                    >
                    🌷 Lưu học sinh 🌷
                    </button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateStudent
