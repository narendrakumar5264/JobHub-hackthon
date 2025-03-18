import mongoose from 'mongoose';

const listingCompany = new mongoose.Schema(
  {
    recruiterName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experienceRequired: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: Array, // Assuming multiple skills can be selected
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingCompany);

export default Listing;