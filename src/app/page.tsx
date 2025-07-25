"use client"
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner"
import Image from "next/image";
import { PiFloppyDisk, PiVideoFill } from "react-icons/pi";
import { TbRosetteDiscount } from "react-icons/tb";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { SiOpenai } from "react-icons/si";
import { LuAudioLines } from "react-icons/lu";
import { IoIosStar, IoIosTimer } from "react-icons/io";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";


export interface MainData {
    frames: Frames
    review: Review
    analyze: Analyze
    metadataAudio: MetadataAudio
    metadataVideo: MetadataVideo
}

export interface Frames {
    main: Main[]
    setup: Setup[]
    climax: Climax[]
    closing: Closing[]
    opening: Opening[]
}

export interface Main {
    url: string
    name: string
    timestamp: number
}

export interface Setup {
    url: string
    name: string
    timestamp: number
}

export interface Climax {
    url: string
    name: string
    timestamp: number
}

export interface Closing {
    url: string
    name: string
    timestamp: number
}

export interface Opening {
    url: string
    name: string
    timestamp: number
}

export interface Review {
    totalReview: number
    positiveReview: number
    positivePercentage: number
}

export interface Analyze {
    main: Main2
    setup: Setup2
    climax: Climax2
    closing: Closing2
    opening: Opening2
    summary: Summary
}

export interface Main2 {
    recommendations: Recommendation[]
    assessmentIndicators: AssessmentIndicator[]
}

export interface Recommendation {
    point: string
    example: string
}

export interface AssessmentIndicator {
    name: string
    value: boolean
}

export interface Setup2 {
    recommendations: Recommendation2[]
    assessmentIndicators: AssessmentIndicator2[]
}

export interface Recommendation2 {
    point: string
    example: string
}

export interface AssessmentIndicator2 {
    name: string
    value: boolean
}

export interface Climax2 {
    recommendations: Recommendation3[]
    assessmentIndicators: AssessmentIndicator3[]
}

export interface Recommendation3 {
    point: string
    example: string
}

export interface AssessmentIndicator3 {
    name: string
    value: boolean
}

export interface Closing2 {
    recommendations: Recommendation4[]
    assessmentIndicators: AssessmentIndicator4[]
}

export interface Recommendation4 {
    point: string
    example: string
}

export interface AssessmentIndicator4 {
    name: string
    value: boolean
}

export interface Opening2 {
    recommendations: Recommendation5[]
    assessmentIndicators: AssessmentIndicator5[]
}

export interface Recommendation5 {
    point: string
    example: string
}

export interface AssessmentIndicator5 {
    name: string
    value: boolean
}

export interface Summary {
    summary: string
    recommendations: string[]
    assessmentIndicators: AssessmentIndicator6[]
}

export interface AssessmentIndicator6 {
    name: string
    value: boolean
}

export interface MetadataAudio {
    url: string
    channels: number
    sampleRate: number
    channelLayout: string
}

export interface MetadataVideo {
    url: string
    size: number
    width: number
    format: string
    height: number
    duration: number
}


export default function Home() {

    // menampung hasil analisa awalnya null, karena belum ada hasil
    const [data, setData] = useState<MainData | null>(null)
    //menampung file sementara sebelum di upload, awalnya null karena belom select
    const [file, setFile] = useState<File | null>(null)
    //membuat state loading, awalnya false karena blm diupload
    const [loading, setLoading] = useState<boolean>(false)


    //fungsi untuk ketika tombol upload dipencet
    async function onUpload() {
        try {
            //cek jika file tidak ada maka muncul notif/toast
            if (file === null) {
                toast("Please Upload Video", {
                    duration: 2000,
                })
                return
            }

            // jika ada
            //buat form data untuk dikirim ke backend
            const formData = new FormData()
            //menambahkan file yg dipilih ke key video
            formData.append("video", file)

            //membuat loading true
            setLoading(true)

            //memanggil backend
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL!, formData)
            //jika respon dari backend sudah ada maka simpan result ke variabel data
            setData(response.data.data)

        } catch (error) {
            //tangkap eror jika eror merupakan eror axios
            if (error instanceof AxiosError) {

                toast(error?.response?.data?.message)
            }
        } finally {
            //membuat loading false karena proses upload sudah selesai
            setLoading(false)
        }

    }


    return (
        <div className="min-h-screen flex flex-col gap-4 w-full font-sans bg-neutral-100 p-4 ">

            {/* navbar */}
            <div className="w-full bg-white flex flex-row  justify-between items-center p-4 fixed top-0 left-0 z-10">
                <div className="text-blue-400 font-bold text-lg md:text-2xl lg:text-4xl flex flex-row items-center gap-2">
                    <PiVideoFill />
                    <div>
                        <div>

                            Video Analyzer
                        </div>
                        <div className="text-gray-700 text-xs md:text-sm md:pl-1 flex flex-row items-center gap-1 ">
                            <SiOpenai />
                            Powered by OpenAI
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                    <button className="bg-neutral-200 p-2 md:p-3 md:text-base text-xs rounded-xl flex flex-row items-center gap-1 w-full md:w-fit justify-center">
                        <TbRosetteDiscount />
                        Free Use
                    </button>
                    <button className="bg-gradient-to-r from-red-500 to-red-400 text-white p-2 text-xs md:p-3 md:text-base rounded-xl flex flex-row items-center gap-1 hover:from-pink-400 hover:to-pink-500 ">
                        <AiTwotoneThunderbolt />
                        Fast Analyzing
                    </button>
                </div>
            </div>


            {/* main content */}
            <div className="flex flex-col gap-8 mt-24">
                <div className="w-full h-auto p-4 bg-white rounded-xl shadow-xl flex flex-col gap-4">
                    <div className="font-semibold text-3xl">Result</div>
                    <div className="w-full h-[60vh] bg-neutral-100 rounded-lg flex items-center justify-center ">
                        {data && !loading ?
                            <video className="h-full w-full" width={640} height={400} controls>
                                <source src={data?.metadataVideo.url} type={data?.metadataVideo.format} />
                            </video>
                            : <div>
                                Please Upload Video
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-4">
                    <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-xl shadow-xl p-4 flex flex-col gap-4">

                        <div className="font-semibold text-xl">Upload Video</div>
                        <Input type="file" onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setFile(e.target.files[0])
                            }
                        }} accept="video/*" />
                        <Button className="bg-blue-400 cursor-pointer w-full" onClick={onUpload} disabled={loading}>{loading ? "Uploading" : "Upload"}</Button>
                        <Dialog >
                            <DialogTrigger>
                                {data ?
                                    <Button className="w-full">Show Result</Button>
                                    : null
                                }
                            </DialogTrigger>
                            <Tabs defaultValue="summary">
                                <DialogContent className="w-[90vw]">
                                    <DialogHeader className="w-full overflow-auto">
                                        <DialogTitle className="text-4xl mb-2 w-fit absolute top-10 left-1/2 transform -translate-x-1/2">Result</DialogTitle>
                                        <TabsList className="mb-2 w-fit mt-20  md:w-full">
                                            <TabsTrigger value="summary">General</TabsTrigger>
                                            <TabsTrigger value="opening">Opening</TabsTrigger>
                                            <TabsTrigger value="setup">Setup</TabsTrigger>
                                            <TabsTrigger value="main">Main</TabsTrigger>
                                            <TabsTrigger value="climax">Climax</TabsTrigger>
                                            <TabsTrigger value="closing">Closing</TabsTrigger>
                                        </TabsList>
                                    </DialogHeader>
                                    <DialogDescription className="w-fit max-h-[65vh] overflow-auto flex flex-col gap-4 ">



                                        <TabsContent value="summary" className="w-full flex flex-col gap-4">
                                            <div className="w-full flex flex-col items-center justify-center">
                                                <IoIosStar className="w-28 h-28 text-yellow-400" />

                                                <div className="font-bold text-black text-xl">{((data?.review.positivePercentage || 0) / 10).toFixed(1)} / 10</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Summary</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.summary.summary}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Recommendations</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.summary.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2" key={index}>{item}</div>
                                                )}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Assessment Indicators</div>
                                                <div className="flex flex-col gap-2">
                                                    {data?.analyze.summary.assessmentIndicators.map((item, index) =>
                                                        <div className="flex flex-row items-center justify-between" key={index}>
                                                            <div className="text-neutral-800">{item.name}</div>
                                                            <div>{item.value ? "✅" : "❌"}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="opening" className="w-full flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Recomendations</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.opening.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2" key={index}>{index + 1}. {item.point}</div>
                                                )}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Example</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.opening.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2 " key={index}>{index + 1}. {item.example}</div>
                                                )}</div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="setup" className="w-full flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Recomendations</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.setup.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2" key={index}>{index + 1}. {item.point}</div>
                                                )}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Example</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.setup.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2 " key={index}>{index + 1}. {item.example}</div>
                                                )}</div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="main" className="w-full flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Recomendations</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.main.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2" key={index}>{index + 1}. {item.point}</div>
                                                )}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Example</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.main.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2 " key={index}>{index + 1}. {item.example}</div>
                                                )}</div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="climax" className="w-full flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Recomendations</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.climax.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2" key={index}>{index + 1}. {item.point}</div>
                                                )}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Example</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.climax.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2 " key={index}>{index + 1}. {item.example}</div>
                                                )}</div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="closing" className="w-full flex flex-col gap-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Recomendations</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.closing.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2" key={index}>{index + 1}. {item.point}</div>
                                                )}</div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="text-black font-semibold text-xl">Example</div>
                                                <div className="text-neutral-800 font-semibold">{data?.analyze.closing.recommendations.map((item, index) =>
                                                    <div className="border-b mb-2 " key={index}>{index + 1}. {item.example}</div>
                                                )}</div>
                                            </div>
                                        </TabsContent>


                                    </DialogDescription>
                                </DialogContent>
                            </Tabs>
                        </Dialog>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/3 bg-white rounded-xl shadow-xl p-4 flex flex-col gap-4">



                        <div className="flex flex-col gap-2">

                            <div className="font-medium text-lg">
                                Metadata
                            </div>
                            <div className="w-full flex flex-row justify-around text-sm gap-4 ">
                                <div className="flex flex-row items-center gap-2"><LuAudioLines />

                                    {data ?

                                        `${data?.metadataAudio.sampleRate} hz (${data?.metadataAudio.channelLayout})
`
                                        : "-"
                                    }


                                </div>


                                <div className="flex flex-row items-center gap-2"><IoIosTimer />
                                    {data ?
                                        `  ${data?.metadataVideo?.duration?.toFixed(2)} s (${data?.metadataVideo.format})  `
                                        : "-"
                                    }
                                </div>

                                <div className="flex flex-row items-center gap-2"><PiFloppyDisk />
                                    {data ?
                                        `                                ${((data?.metadataVideo.size || 0) / (1024 * 1024)).toFixed(2)} Mb
`                                : "-"
                                    }
                                </div>





                            </div>
                        </div>







                        <Tabs defaultValue="opening" className="w-full">
                            <TabsList className="mb-2 w-full">
                                <TabsTrigger value="opening">Opening</TabsTrigger>
                                <TabsTrigger value="setup">Setup</TabsTrigger>
                                <TabsTrigger value="main">Main</TabsTrigger>
                                <TabsTrigger value="climax">Climax</TabsTrigger>
                                <TabsTrigger value="closing">Closing</TabsTrigger>
                            </TabsList>
                            <TabsContent value="opening" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ">

                                {data?.frames.opening.map((item, index) => <CardFrame url={item.url} name={item.name} timestamp={item.timestamp} key={index} />)}

                            </TabsContent>
                            <TabsContent value="setup" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ">

                                {data?.frames.setup.map((item, index) => <CardFrame url={item.url} name={item.name} timestamp={item.timestamp} key={index} />)}
                            </TabsContent>
                            <TabsContent value="main" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ">

                                {data?.frames.main.map((item, index) => <CardFrame url={item.url} name={item.name} timestamp={item.timestamp} key={index} />)}
                            </TabsContent>
                            <TabsContent value="climax" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ">

                                {data?.frames.climax.map((item, index) => <CardFrame url={item.url} name={item.name} timestamp={item.timestamp} key={index} />)}
                            </TabsContent>
                            <TabsContent value="closing" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full ">

                                {data?.frames.closing.map((item, index) => <CardFrame url={item.url} name={item.name} timestamp={item.timestamp} key={index} />)}
                            </TabsContent>

                        </Tabs>





                    </div>
                </div>

            </div>

            {/* footer */}
            <div className="px-8 py-16 flex flex-row items-center justify-center w-full bg-white rounded-xl shadow-2xl">
                &copy;2025 Made by 3ldorr
            </div>
            <Toaster />
        </div>
    );
}

interface CardFrameProps {
    name: string
    url: string
    timestamp: number
}

function CardFrame({ name, timestamp, url }: CardFrameProps) {
    return (
        <Card className="!aspect-[9/16] h-auto w-full overflow-hidden">
            <CardContent className="overflow-hidden w-full h-full">
                <Image src={url} alt="" width={600} height={400} className="w-full h-full object-cover rounded-md" />

            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <div className="font-semibold">{name}</div>
                <div className="text-gray-700 text-sm">
                    {`${Math.floor(timestamp / 60)}:${(timestamp % 60).toString().padStart(2, "0")}`}
                </div>
            </CardFooter>
        </Card>
    )
}