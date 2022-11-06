import { post as theForge } from './pages/the-forge.astro'
import { post as theBeltKnife } from './pages/the-belt-knife.astro'
import { post as agita } from './pages/agita.astro'
import { post as makingCharcoal } from './pages/making-charcoal.astro'
import { post as wroughtIronCandleHolder } from './pages/wrought-iron-candle-holder.astro'
import { post as theFrictionFolder } from './pages/peasant-knife.astro'
import { Post } from './post'

export const posts: Post[] = [
	theFrictionFolder,
	wroughtIronCandleHolder,
	makingCharcoal,
	agita,
	theBeltKnife,
	theForge
]

export const getPostsAround = (post: Post) : { 
    previousPost: Post | undefined, 
    nextPost: Post | undefined 
} => {

    let indexOfPost = 0
    for (const p of posts) {
        if (p.name === post.name) {
            break
        }
        indexOfPost++
    }

	const previousPost = posts[indexOfPost - 1]
    const nextPost = posts[indexOfPost + 1]

	return {
        previousPost,
        nextPost
	}
}