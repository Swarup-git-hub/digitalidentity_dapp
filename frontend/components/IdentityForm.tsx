import { useState } from "react";
import { useIdentity } from "../hooks/useIdentity";

export function IdentityForm() {
  const { identity, busy, save } = useIdentity();
  const [form, setForm] = useState({
    username: identity?.username ?? "",
    bio: identity?.bio ?? "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(form);
      }}
      className="glass p-6 rounded space-y-4"
    >
      <input
        value={form.username}
        required
        onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
        className="w-full glass p-3 rounded"
        placeholder="Username"
      />
      <textarea
        value={form.bio}
        onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
        className="w-full glass p-3 h-24 rounded"
        placeholder="Bio"
      />
      <button disabled={busy} className="w-full py-3 bg-purple-600/80 rounded">
        {busy ? "Submitting…" : identity ? "Update" : "Create"}
      </button>
    </form>
  );
}
