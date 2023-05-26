const Campground = require('../models/campground');


//campgrounds page
module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}

//getting to the new campground page
module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
}

//posting the new campground
module.exports.createCampground = async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground');  
    res.redirect(`/campgrounds/${campground._id}`)

}

//showing the detaild of the campground+reviews
module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    if(!campground){
        req.flash('error', 'Cannot find that campground!')
        return res.redirect(`/campgrounds`)
        
    }
    res.render('campgrounds/show', { campground });
}

//getting to the edit campground page
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);  
    if(!campground){
        req.flash('error', 'Cannot find that campground!')
        return res.redirect(`/campgrounds`)
        
    }
    res.render('campgrounds/edit', { campground });
}

//updating the existing campground with the new informations
module.exports.updateCampground = async (req, res) => {
   
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated a campground');
    res.redirect(`/campgrounds/${camp._id}`)

}

//deleting a campground
module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id)
    req.flash('success', 'Your campground has been deleted');
    res.redirect(`/campgrounds`)

}