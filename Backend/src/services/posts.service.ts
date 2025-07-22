import { postRepository } from '../repositories/post.repository'
import { userRepository } from '../repositories/user.repository'

export const postService = {
  createPostUser: async (post: { title: string, content: string, id_author: string }) => {
    if (!post.title || !post.content || !post.id_author) throw new Error ('Faltan datos por agregar')
    const userExiste = await userRepository.findIdUser(post.id_author)
    if (!userExiste) throw new Error ('No se econtro el usuario')

    const newPost = await postRepository.createPost({ title: post.title, content: post.content, id_author: userExiste.id_user })

    if (!newPost) throw new Error ('No se econtraron datos a publicar')

    return newPost
  },

  updatePostUser: async (post: { title?: string, content?: string, id_author: string, id_post: string }) => {
    const { title, content, id_author, id_post } = post

    if (!title || !content || !id_author || !id_post) throw new Error ('Faltan datos por agregar')

    const userExiste = await userRepository.findIdUser(post.id_author)
    if (!userExiste) throw new Error ('Error al encontrar el usuario')

    const data: { title?: string, content?: string } = {}

    if (post.title !== undefined) data.title = post.title
    if (post.content !== undefined) data.content = post.content
    
    const postExisteAndUser = await postRepository.findPostIdAndUserId(id_post, id_author)

    if (!postExisteAndUser) throw new Error ('Error el encontrar los ids')

    const updatePost = await postRepository.updatePost(data, id_post)

    return updatePost
  },

  getAllPost: async () => {
    const allPosts = await postRepository.getAllPosts()
    if (!allPosts) throw new Error ('No se encontraron Posts')

    return allPosts
  },

  getAllPostId: async (post: { id_author: string }) => {
    const allPostsIdUser = await postRepository.getAllPostsIdUser(post.id_author)
    if (!allPostsIdUser) throw new Error ('No hay Posts para este usuario')

    return allPostsIdUser
  },

  deletePostId: async (post: { id_author: string, id_post: string }) => {
    const postExisteForUserAndPos = await postRepository.findPostIdAndUserId(post.id_post, post.id_author)
    if (!postExisteForUserAndPos) throw new Error ('No se encontraron los Ids')

    await postRepository.deletePostIdUser(post.id_post)

    return { message: 'Post eliminado correctamente' }
  }
}
