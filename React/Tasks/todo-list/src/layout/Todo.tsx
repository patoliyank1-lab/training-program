export default function Todo({
  title = "title",
  description,
  priority = "high",
  category ="work",
  dueDate,
  isCompleted = false,
}) {
  return (
    <>
    <div>
      <div className="bg-white my-2 w-full rounded-xl shadow-xl p-5 flex flex-col">
        <div className=" text-start text-xl px-2 mb-3">
          <h2>{title}</h2>
        </div>
        <div className="flex justify-between mt-2">
          {priority === "low" && (
            <div className="bg-blue-400 text-white px-2 py-1 rounded-full w-14 text-sm mr-3">
              {priority}
            </div>
          )}

          {priority === "medium" && (
            <div className="bg-yellow-300 text-white px-2 py-1 rounded-full  text-sm mr-3">
              {priority}
            </div>
          )}

          {priority === "high" && (
            <div className="bg-red-400 text-white px-2 py-1 rounded-full w-14 text-sm mr-3">
              {priority}
            </div>
          )}

          {isCompleted && (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
              Completed
            </div>
          )}

          {!isCompleted && (
            <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm">
              Not Complet
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
