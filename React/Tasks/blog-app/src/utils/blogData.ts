import type { Blog } from "../Type";

function getBlogs(): Blog[] {
    const data = localStorage.getItem('Blogs');
    let BlogList: Blog[] = [];
    if (data) {
        BlogList = JSON.parse(data)
        return BlogList
    }
    else {
        localStorage.setItem('Blogs', JSON.stringify([]))
    }
    return [];
}


function addBlog( bTitle: string, bDescription: string, bU_id: string , bImg?: string  ) {

    const BlogList: Blog[] = getBlogs();

    const newBlog: Blog = {
        id: idGen(10),
        title: bTitle,
        u_id: bU_id,
        description: bDescription,
        img: bImg ? bImg : 'https://images.unsplash.com/photo-1770297345796-8de4cf924c08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8',
        likes: 0,
        share: 0,
        view: 0,
        createdAt: new Date().toISOString(),
    }


    BlogList.push(newBlog);

    localStorage.setItem('Blogs', JSON.stringify(BlogList))

    function idGen(length: number) {
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;

        let id: number;

        do {
            id = Math.floor(Math.random() * (max - min) + min);
        } while (BlogList.find((blog: Blog) => Number(blog.id) === id));

        return id.toString();
    }


}


export { getBlogs, addBlog }