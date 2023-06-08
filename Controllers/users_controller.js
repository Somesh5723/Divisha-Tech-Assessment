const User=require('../Models/users');

module.exports.users=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then((user)=>{
            if(user){
                return res.render('index',{
                    title:"Hello Users!!",
                    user:user
                });
            }else{
                return res.redirect('/profile/signIn');
            }
        })
    }else{
        return res.redirect('/profile/signIn');
    }
}

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"signUp"
    })
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"signIn"
    });
}

module.exports.create=function(req,res){
    //  if(req.body.password!=req.body.confirm_password){
    //     return res.redirect('back');
    //  }
    //  Logging.create({email:req.body.email})
    //  .then((user)=>{
    //         if(!user){
    //             Logging.create(req.body)
    //                 .then(()=>{return res.redirect('/profile/signIn');})
    //                 .catch((err)=>{console.log('error in creating Username',err);
    //                 return;})
    //             }
    //         else{
    //             return res.redirect('back');
    //         }
    //     })
    //  .catch((err)=>{
    //     if(err){
    //         console.log('error in starting',err);
    //     };
    //     return;
    // })
    if(req.body.password != req.body.confirm_password)
    return res.redirect('back');

    //cuz email is unique for every user
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(!user) 
               return User.create(req.body);
            else
               throw new Error('User already exists'); //it will immediately terminate the current promise chain and trigger the catch() method
        })
        .then(() => {
            // req.flash('success', 'Account created successfully');
            return res.redirect('/profile/signIn');
        })
        .catch((err) => {
            //If user already exists OR if error in finding user(by email) while signing up - In both cases, error message will be displayed accordingly
            // req.flash('error', 'Failed to create account');
            console.error(`Error in user sign-up: ${err}`);
            return res.redirect('back');
        });
    }
   


// module.exports.session=async(req,res)=>{
//     //  User.findOne({email:req.body.email})
//     //  .then((user)=>{
//     //     if(user){
//     //     if(user.password !=req.body.password){
//     //         return res.redirect('back');
//     //     }
//     //     //handle session creation
//     //     res.cookie('user_id',user.id);
//     //     return res.redirect('/profile/users');
//     //  }else{
//     //     // handle user not found
//     //     return res.redirect('back');
//     //  }
//     // })
//     // .catch((err)=>{console.log('error in finding user in signing in',err);return;})
     
//      try{
//        const existingUser=await User.findOne({email:req.body.email})
//        if(existingUser){
//         if(existingUser.password!=req.body.password){
//             return res.redirect('back');
//         }
//         res.cookie('user_id',existingUser.id);
//         console.log("cookie",existingUser.id);
//         res.redirect('/profile/users');
//        }
//        return res.redirect('back');
//      }
//      catch(err){
//         if(err){
//             console.log('err in signingUp',err);
//             return;
//         }
//      }

// }

module.exports.session = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        if (existingUser.password !== req.body.password) {
          return res.redirect('back');
        }
        
        // Set the user ID in a cookie
        res.cookie('user_id', existingUser.id, { maxAge: 3600000, httpOnly: true }); // Example: cookie expires in 1 hour
        
        // Redirect to the desired page after successful sign-in
        return res.redirect('/profile/users');
      }
  
      return res.redirect('back');
    } catch (err) {
      console.log('Error in signing in:', err);
      return;
    }
  };