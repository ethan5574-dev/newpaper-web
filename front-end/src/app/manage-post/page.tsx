"use client"

import { useMemo, useState } from "react"
import { Plus, X, Search, MoreHorizontal, Eye, Calendar, User, Hash } from "lucide-react"
import Modal from "@/components/Modal"
import dynamic from 'next/dynamic';
const CKEditorClient = dynamic(() => import('@/components/CKEditorClient'), { ssr: false });

type Post = {
  id: number
  title: string
  author: string
  views: number
  createdAt: string
  content: string
}

const ManagePostPage = () => {
  const initialData: Post[] = useMemo(
    () => [
      { id: 1, title: "Create Meaningful Family Moments", author: "Jane Doe", views: 1200, createdAt: "2025-09-20", content: "Create Meaningful Family Moments" },
      {
        id: 2,
        title: "Workspace Design Trends and Ideas",
        author: "Alex Johnson",
        views: 860,
        createdAt: "2025-09-18",
        content: "Workspace Design Trends and Ideas"
      },
      {
        id: 3,
        title: "The Pomodoro Technique Really Works",
        author: "Emily Carter",
        views: 1540,
        createdAt: "2025-09-15",
        content: "The Pomodoro Technique Really Works"
      },
    ],
    [],
  )

  const [posts, setPosts] = useState<Post[]>(initialData)
  const [showForm, setShowForm] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const handleAdd = () => {
    if (!title.trim() || !author.trim()) return
    const newPost: Post = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title: title.trim(),
      author: author.trim(),
      content: content.trim(),
      views: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    console.log(newPost)
    setPosts((prev) => [...prev, newPost])
    setTitle("")
    setAuthor("")
    setShowForm(false)
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen mt-16 bg-white text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground text-balance">Content Management</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage and organize your blog posts</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            <Plus className="h-4 w-4" />
            Create Post
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{filteredPosts.length} posts</span>
          </div>
        </div>

        {/* Posts Table */}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {/* Table Header */}
          <div className="hidden grid-cols-[60px_1fr_200px_120px_140px_60px] border-b border-border bg-muted/30 px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider lg:grid">
            <div className="flex items-center gap-2">
              <Hash className="h-3 w-3" />
              ID
            </div>
            <div>Title</div>
            <div className="flex items-center gap-2">
              <User className="h-3 w-3" />
              Author
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-3 w-3" />
              Views
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              Created
            </div>
            <div></div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="group grid grid-cols-1 gap-4 px-6 py-4 transition-colors hover:bg-muted/20 lg:grid-cols-[60px_1fr_200px_120px_140px_60px] lg:items-center lg:gap-0"
              >
                {/* Mobile Layout */}
                <div className="lg:hidden space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-card-foreground text-pretty">{post.title}</h3>
                      <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {post.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author}
                        </span>
                      </div>
                    </div>
                    <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-mono text-muted-foreground">
                    #{post.id}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <h3 className="font-medium text-card-foreground text-pretty group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
                <div className="hidden lg:block text-sm text-muted-foreground">{post.author}</div>
                <div className="hidden lg:block text-sm text-muted-foreground">{post.views.toLocaleString()}</div>
                <div className="hidden lg:block text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
                <div className="hidden lg:block">
                  <button className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-card-foreground mb-1">No posts found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first post"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        size="xl"
      >
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-zinc-900">Create New Post</h2>
            <p className="text-sm text-zinc-600 mt-1">Add a new blog post to your collection</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Post Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Author Name</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name..."
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-zinc-900 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">Content</label>
              <CKEditorClient value={content} onChange={setContent} placeholder="Write your post..." />
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!title.trim() || !author.trim()}
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Post
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ManagePostPage
