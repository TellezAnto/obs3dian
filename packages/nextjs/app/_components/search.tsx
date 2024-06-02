"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PostPreview } from "./post-preview";

function useOutsideAlerter(ref: MutableRefObject<HTMLElement | null>, callback: (event: MouseEvent) => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref, callback]);
}

interface SearchProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

function Search({ visible, setVisible }: SearchProps) {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (visible) {
      inputRef.current?.focus();
    }
  }, [visible]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        setVisible(true);
      }
      if (e.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [setVisible]);

  useOutsideAlerter(containerRef, (e: MouseEvent) => {
    setVisible(false);
    e.stopPropagation();
  });

  useEffect(() => {
    setVisible(false);
  }, [pathname, setVisible]);

  async function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const res = await fetch(`/api/search?q=${e.target.value}`);
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      console.log("Search Results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setSearchResults([]);
    }
  }

  return (
    <div
      className={`absolute top-0 h-screen pb-16 z-20 left-0 w-full overflow-y-auto overscroll-none overflow-x-hidden bg-white/95 ${
        visible ? "block" : "hidden"
      }`}
    >
      <div ref={containerRef} className="max-w-4xl mx-auto flex flex-wrap mt-5 px-5">
        {/* Search Bar */}
        <div className="w-full">
          <label className="block text-sm sr-only" htmlFor="search">
            Search
          </label>
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              id="search"
              type="search"
              className="form-input w-full text-gray-800 px-3 py-2 pl-10"
              placeholder="Search my notes"
              onChange={handleChangeInput}
            />
            <button type="submit" className="absolute inset-0 right-auto" aria-label="Search">
              <svg
                className="w-4 h-4 fill-current text-gray-400 mx-3 shrink-0"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zM15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.map(res => {
          console.log("Rendering PostPreview with:", res);
          return (
            <PostPreview
              key={res.item.slug}
              title={res.item.title}
              excerpt={res.item.excerpt}
              slug={res.item.slug}
              date={res.item.date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;
