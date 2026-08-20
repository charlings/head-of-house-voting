"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiSearch, FiCheck } from "react-icons/fi";
import { Participant } from "@/lib/types";

type NameComboboxProps = {
  id: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  participants: Participant[];
  value: Participant | null;
  onChange: (participant: Participant) => void;
  votedIds?: string[];
  helperText?: string;
};

export default function NameCombobox({
  id,
  label,
  placeholder,
  icon,
  participants,
  value,
  onChange,
  votedIds = [],
  helperText,
}: NameComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return participants;
    return participants.filter(
      (p) => p.name.toLowerCase().includes(q) || p.id.includes(q)
    );
  }, [participants, query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  function selectParticipant(p: Participant) {
    onChange(p);
    setQuery("");
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = filtered[activeIndex];
      if (pick) selectParticipant(pick);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink/60">
        {icon}
        {label}
      </label>

      <button
        type="button"
        id={id}
        onClick={() => {
          setOpen((o) => !o);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="flex w-full items-center justify-between gap-2 rounded-xl border-2 border-ink/10 bg-white px-4 py-3 text-left shadow-card transition hover:border-gold focus:border-gold"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value ? (
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[11px] font-semibold text-paper">
              {value.id}
            </span>
            <span className="font-medium text-ink">{value.name}</span>
          </span>
        ) : (
          <span className="text-slate">{placeholder}</span>
        )}
        <FiChevronDown
          className={`shrink-0 text-slate transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {helperText && (
        <p className="mt-1 text-xs text-slate">{helperText}</p>
      )}

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-ink/10 bg-white shadow-stamp">
          <div className="flex items-center gap-2 border-b border-ink/10 px-3 py-2">
            <FiSearch className="text-slate" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search by name or ID…"
              className="w-full bg-transparent py-1 text-sm text-ink outline-none placeholder:text-slate/70"
              autoComplete="off"
            />
          </div>
          <ul
            role="listbox"
            className="max-h-64 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate">No match found.</li>
            )}
            {filtered.map((p, i) => {
              const isSelected = value?.id === p.id;
              const voted = votedIds.includes(p.id);
              return (
                <li key={p.id} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => selectParticipant(p)}
                    className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm transition ${
                      i === activeIndex ? "bg-gold-soft/60" : "hover:bg-base-200"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 font-mono text-[11px] font-semibold text-ink/70">
                        {p.id}
                      </span>
                      <span>
                        <span className="block font-medium text-ink">{p.name}</span>
                        <span className="block text-[11px] text-slate">{p.room}</span>
                      </span>
                    </span>
                    <span className="flex items-center gap-2">
                      {voted && (
                        <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[10px] font-semibold text-teal">
                          Voted
                        </span>
                      )}
                      {isSelected && <FiCheck className="text-gold" />}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
