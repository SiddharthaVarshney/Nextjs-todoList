import { redirect } from "next/navigation"
import Link from "next/link"

// runnin on server!!!
async function createTodoItem(data){
  "use server"
  const title = data.get("title")?.valueOf()
  if(typeof(title) !== 'string' || title.length == 0){
    throw new Error("invalid title")
  }

  await prisma.toDo.create({data: {title: title, complete: false}})

  console.log("hi server!!")
  redirect("/")
}

const newPage = () => {
  return <>
      <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl">New</h1>
    </header>

    <form action={createTodoItem} className="flex flex-col gap-2">
      <input type="text" name="title" className="border border-slate-300 bg-transparent px-2 py-1 rounded
      focus-within:border-slate-100 outline-none" />
      <div className="flex gap-1 justify-end">
        <Link href='..' className="border border-slate-300 px-2 py-1 rounded hover:bg-slate-700
      focus-within:bg-slate-700 outline-none">Cancel</Link>
        <button type="submit" className="border border-slate-300 px-2 py-1 rounded hover:bg-slate-700
      focus-within:bg-slate-700 outline-none">Create</button>
      </div>
    </form>

  </>
}

export default newPage