import React from "react"

interface ImageBundleProps {
  urls: string[]
  maxImages?: number
}

const ImageBundle = (props: ImageBundleProps) => {
  const { urls, maxImages = 5 } = props
  const urlSet = new Set(urls)
  const uniqueUrls = Array.from(urlSet)

  return (
    <div className="flex items-center">
      {uniqueUrls.map((url, index) => {
        if (maxImages && index >= maxImages) return null

        return (
          <img
            key={index}
            src={url}
            alt={"assignee.name"}
            className={`w-8 h-8 border-[2px] border-white rounded-full ${
              index !== 0 ? "-ml-3" : ""
            }`}
          />
        )
      })}

      {uniqueUrls.length > maxImages ? (
        <div className="flex items-center text-black gap-x-1 ml-1">
          <span className="text-xs ">+{uniqueUrls.length - maxImages}</span>
        </div>
      ) : null}
    </div>
  )
}

export default ImageBundle
