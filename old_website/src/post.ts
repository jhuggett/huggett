export enum Tag {
	Blacksmithing = 'blacksmithing',
	Coding = 'coding',
	Woodworking = 'woodworking'
}

export interface Post {
	title: string
	name: string
	coverImage: ImageMetadata
	coverImageAlt: string
	writtenOn: string
	lastUpdatedOn: string | null
	description: string
	tags: Tag[]
}