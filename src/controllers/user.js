export const getUsers=async(req,res)=>{

    try{
        res.json({
            message:"Go India"
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const getUserById=async(req,res)=>{
    try{

    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const updateUser=async(req,res)=>{
    try{

    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}

export const deleteUser=async(req,res)=>{
    try{

    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            error:`Something went wrong ${e.message}`
        })
    }

}