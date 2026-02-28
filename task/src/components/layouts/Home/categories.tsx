import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BriefcaseBusiness, FileCode } from "lucide-react";

export default function Categories() {
    return (
        <div className="">
            <div className="flex flex-col mx-auto max-w-315 p-5 items-center">
                <p className="text-green-500 text-xl md:text-2xl">Find Your Path</p>
                <h2 className="scroll-m-20 text-center text-4xl md:text-5xl font-extrabold text-balance mb-5">
                    Browse Jobs By Categories
                </h2>
                <CarouselSize />
            </div>
        </div>
    );
}




function CarouselSize() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-[80%] h-80"
        >
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                     <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <CategoryCard  />
                     </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}



function CategoryCard() {
    return (
        <>
           
                <div>
                    <Card className="z-0 py-0">
                        <CardContent className="flex flex-col gap-3 aspect-square items-center justify-center">
                            <div className="bg-violet-400 text-white rounded-2xl p-5">
                                <FileCode className="size-10" />
                            </div>
                            <h3 className="text-xl font-semibold">Admin</h3>
                            <div className="flex gap-1 items-center bg-violet-500 rounded-2xl px-2 py-1 text-white font-medium text-sm">
                                <BriefcaseBusiness className="size-4.5 flex" />
                                <p className=""><span>{'(23)'}</span>Jobs</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
        </>
    )
}