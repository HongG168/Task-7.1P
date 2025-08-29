// src/services/authApi.js
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import bcrypt from "bcryptjs";

function normalizeEmail(email) {
    return String(email || "")
        .trim()
        .toLowerCase();
}

export async function signUpUser({
    firstName,
    lastName,
    email,
    password,
    hashPasswords = true,
}) {
    const safeEmail = normalizeEmail(email);
    if (!safeEmail || !password || !firstName || !lastName) {
        throw new Error("All fields are required.");
    }

    const userRef = doc(db, "users", safeEmail);
    const existing = await getDoc(userRef);
    if (existing.exists()) {
        throw new Error("An account with this email already exists.");
    }

    let passwordHash = password;
    if (hashPasswords) {
        const salt = bcrypt.genSaltSync(10);
        passwordHash = bcrypt.hashSync(password, salt);
    }

    await setDoc(userRef, {
        firstName,
        lastName,
        email: safeEmail,
        passwordHash,
        createdAt: serverTimestamp(),
    });

    return { ok: true };
}

export async function loginUser({ email, password }) {
    const safeEmail = normalizeEmail(email);
    if (!safeEmail || !password) {
        throw new Error("Email and password are required.");
    }

    const userRef = doc(db, "users", safeEmail);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
        throw new Error("Invalid email or password.");
    }
    const user = snap.data();

    const stored = user.passwordHash;
    const isHashed = typeof stored === "string" && stored.length > 20;
    const ok = isHashed
        ? bcrypt.compareSync(password, stored)
        : stored === password;

    if (!ok) throw new Error("Invalid email or password.");

    const session = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        loginAt: Date.now(),
    };
    localStorage.setItem("devdeakin_session", JSON.stringify(session));
    return session;
}

export function getSession() {
    try {
        const raw = localStorage.getItem("devdeakin_session");
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function logout() {
    localStorage.removeItem("devdeakin_session");
}
