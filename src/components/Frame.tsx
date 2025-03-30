"use client";

import { useEffect, useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES, PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import { useFrameSDK } from "~/hooks/useFrameSDK";

function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = GALLERY_IMAGES[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? GALLERY_IMAGES.length - 1 : prevIndex - 1
    );
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === GALLERY_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{PROJECT_TITLE}</CardTitle>
        <CardDescription className="text-xs">
          {PROJECT_DESCRIPTION}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 relative">
        <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
          {/* Using img element for simplicity in this Frame v2 app */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 pb-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        
        <div className="text-sm font-medium text-center">
          {currentImage.caption}
          <div className="text-xs text-muted-foreground mt-1">
            {currentIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full"
          onClick={goToNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Frame() {
  const { isSDKLoaded } = useFrameSDK();

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      <ImageGallery />
    </div>
  );
}
