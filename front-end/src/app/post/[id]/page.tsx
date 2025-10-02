"use client";
import { Eye } from 'lucide-react';
import Image from 'next/image';
import {getPost} from '@/fetching/post';
import { incrementView } from '@/fetching/view';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';


const Page = ()=> {
  const { id } = useParams();
    const { data: post, isLoading: isPostLoading, isError: isPostError } = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(Number(id)),
    });
    const { mutate: incrementViewMutation } = useMutation({
        mutationFn: (postId: number) => incrementView(postId),
    });

    // Auto increment view when page loads
    useEffect(() => {
        if (id && !isPostLoading && !isPostError) {
            incrementViewMutation(Number(id));
        }
    }, [id, isPostLoading, isPostError, incrementViewMutation]);

    if (isPostLoading) {
        return <Loading/>   ;
    }
    
    if (isPostError || !post?.data) {
        return (
            <div className="mt-16 px-4 py-8 sm:py-12 bg-zinc-100">
                <div className="mx-auto max-w-[900px] text-center">
                    <h1 className="text-2xl font-bold text-zinc-900">Post not found</h1>
                    <p className="mt-2 text-zinc-600">The post you&apos;re looking for doesn&apos;t exist.</p>
                </div>
            </div>
        );
    }

    const postData = post?.data;
    const stripHtml = (html?: string) => (html ? html.replace(/<[^>]+>/g, '') : '');

    return (
        <article className=" mt-16 px-4 py-8 sm:py-12 bg-zinc-100">
            {/* Title */}
            <div className="mx-auto max-w-[900px]">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                    {postData.title}
                </h1>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-900">
                    <div className="flex items-center gap-3">
                        <Image
                            src="https://randomuser.me/api/portraits/women/65.jpg"
                            alt={postData.author?.username || 'Author'}
                            width={36}
                            height={36}
                            className="rounded-full"
                        />
                        <span className="text-xl text-zinc-900 font-bold">{postData.author?.username || 'Unknown'}</span>
                    </div>
                    <span className="text-zinc-400 font-bold ">•</span>
                    <span className="text-zinc-700 font-bold ">{new Date(postData.createdAt).toLocaleDateString()}</span>
                    <span className="text-zinc-400 ">•</span>
                    <span className="flex items-center gap-1 text-zinc-700">
                        <Eye className="h-4 w-4" />
                        {postData.total_view_count?.toLocaleString() || 0} views
                    </span>
                </div>

                {/* Cover image */}
                {postData.image_url && (
                    <div className="relative mt-6 overflow-hidden rounded-lg">
                        <Image
                            src={postData.image_url}
                            alt={postData.title}
                            width={1600}
                            height={900}
                            className="h-[240px] w-full object-cover sm:h-[360px] md:h-[420px]"
                        />
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-zinc mt-8 max-w-none text-zinc-900">
                    <div dangerouslySetInnerHTML={{ __html: postData.content }} />
                </div>
            </div>
        </article>
    );
}
export default Page;



