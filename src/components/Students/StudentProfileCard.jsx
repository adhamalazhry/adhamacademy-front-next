export default function StudentProfileCard({ student }) {
  return (
    <div className="w-full max-w-sm rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-900 text-3xl font-bold text-white">
          {student?.name?.charAt(0) || "?"}
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          {student?.name}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Student ID #{student?.id}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3">
          <span className="text-gray-500">Age</span>
          <span className="font-semibold text-gray-900">{student?.age}</span>
        </div>

        <div className="flex justify-between rounded-2xl bg-gray-50 px-4 py-3">
          <span className="text-gray-500">Teacher</span>
          <span className="font-semibold text-gray-900">
            {student?.teacher?.name || "Not Assigned"}
          </span>
        </div>

        <div className="rounded-2xl bg-gray-50 px-4 py-3">
          <p className="mb-1 text-gray-500">Email</p>
          <p className="font-semibold text-gray-900 break-all">
            {student?.email || "No Email"}
          </p>
        </div>
      </div>
    </div>
  );
}