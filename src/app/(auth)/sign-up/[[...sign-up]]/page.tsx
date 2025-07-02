import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-4 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <SignUp />
      </div>
    </div>
  );
}
