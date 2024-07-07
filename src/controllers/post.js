import prisma from "../../lib/prisma.js";

export const getPosts=async(req, res) => {
    try{
        const posts=await prisma.post.findMany()
        res.status(200).json(posts)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

export const getPost=async(req,res)=>{
    try{
        const id=parseInt(req.params.id);


        const post=await prisma.post.findUnique({
                where:{id},
        })

        if(!post){
            res.status(404).json({
                message:`Post for given id ${id} not found`,
                status:404
            })
        }

        res.status(200).json(post)

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}
export const addPost = async (req, res) => {
    try {
        const { title, price, address, city, bedroom, bathroom, latitude, longitude, type, property, images } = req.body;
        const tokenUserId = req.userId;

        try {
            // Find or create the User based on the tokenUserId
            let user;
            if (tokenUserId) {
                user = await prisma.user.findUnique({
                    where: { id: tokenUserId }
                });
            }

            if (!user) {
                // Create a new User if not found (This part may depend on your authentication flow)
                return res.status(404).json({
                    "message":`User with given ${tokenUserId} not found`,
                })
            }

            // Create the Post and associate it with the found or created User
            const post = await prisma.post.create({
                data: {
                    title,
                    price,
                    address,
                    city,
                    bedroom,
                    bathroom,
                    latitude,
                    longitude,
                    type,
                    property,
                    user: {
                        connect: { id: user.id }
                    },
                    images: images ? { create: { url: images.url } } : undefined
                },
                include: {
                    images: true // Include the associated image in the response
                }
            });

            return res.status(201).json({ post });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Failed to create post" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

export const updatePost=async(req,res)=>{
    try{

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}

export const deletePost=async(req,res)=>{
    try{
        const id=req.params.id
        const tokenId=req.userId

        const post=await prisma.post.findUnique({
            where:{id},
        })

        if(post.userId!==tokenId){
            return res.status(403).json({
                message:"Unauthourized",
                status:403
            })
        }

        await prisma.post.delete({
            where:{id}
        })

        res.status(200).json({
            message:"Post deleted"
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
}