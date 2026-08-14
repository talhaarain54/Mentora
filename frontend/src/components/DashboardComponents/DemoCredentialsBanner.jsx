function DemoCredentialsBanner({ role = "", email, password }) {
  return (
    <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 p-3 text-sm">
      <p className="font-medium text-blue-800 dark:text-blue-300">
        Demo {role || "User"} Account Credentials:
      </p>
      <p className="text-blue-700 dark:text-blue-400 mt-1">
        Email: <code className="bg-white/60 dark:bg-black/30 px-1 rounded">{email}</code>{" "}
        &nbsp;Password: <code className="bg-white/60 dark:bg-black/30 px-1 rounded">{password}</code>
      </p>
    </div>
  );
}

export default DemoCredentialsBanner;