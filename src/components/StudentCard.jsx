import { Link } from "react-router-dom";

const StudentCard = ({student, currentPage}) => {
  return (
    <div className="relative bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 max-w-xs w-full">
      <div className="relative">
        <img
          src={student.image}
          alt={student.name}
          className="w-full h-70 sm:h-84 object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
      </div>
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold text-white tracking-wide mb-3">
          {student.name}
        </h2>
        <Link
          to={`/details/${student._id}?page=${currentPage}`}
          className="inline-block bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-300 hover:shadow-lg"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  )
}

export default StudentCard
