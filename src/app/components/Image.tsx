"use client";

import OpenAI from "openai";
import React, { useRef, useState } from "react";
import Image from "next/image";
import defaultImage from "@/app/assets/default_image.svg";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const imageGenerator = async () => {
    if (inputRef.current && inputRef.current.value) {
      setIsLoading(true);

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: inputRef.current.value,
        n: 1,
        size: "1024x1024",
      });

      setImageUrl(response.data[0].url);
    }

    setIsLoading(false);

    return 0;
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="text-5xl">
        AI Image <span className="text-fuchsia-400">Generator</span>
      </div>
      <div className="mt-10 mb-4">
        <Image
          src={imageUrl || defaultImage}
          alt="Default Image"
          width={400}
          height={400}
        />
        {isLoading && (
          <>
            <div className="bg-fuchsia-400 w-full h-2 rounded mt-2"></div>
            <div className="text-xs">Loading...</div>
          </>
        )}
      </div>
      <div className="w-full">
        {/*<div className="heading text-center font-bold text-2xl m-5 text-gray-800">*/}
        {/*  New Post*/}
        {/*</div>*/}

        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          {/*<input*/}
          {/*  className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"*/}
          {/*  spellCheck="false"*/}
          {/*  placeholder="Title"*/}
          {/*  type="text"*/}
          {/*/>*/}
          <textarea
            ref={inputRef}
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="Describe what you want to see"
          />

          <div className="flex pt-2 items-center justify-between">
            <div className="text-gray-400 text-xs font-semibold">0/300</div>
            {/*<div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">*/}
            {/*  Cancel*/}
            {/*</div>*/}
            <div
              className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
              onClick={imageGenerator}
            >
              Generate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
