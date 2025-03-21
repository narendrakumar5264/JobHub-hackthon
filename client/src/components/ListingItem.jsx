import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function CompanyCard({ listing }) {
  return (
    <div className='bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden rounded-xl w-[300px] sm:w-[350px] p-4 border border-gray-200'>
      <Link to={`/listing/${listing._id}`} className='flex flex-col items-center gap-3'>
        {/* Company Logo */}
        <img
          src={
            listing.imageUrls[0] ||
            'https://via.placeholder.com/100'
          }
          alt='company logo'
          className='h-[100px] w-[100px] object-cover rounded-lg border border-gray-300'
        />
        
        {/* Company Info */}
        <div className='text-center w-full'>
          <p className='truncate text-xl font-semibold text-gray-800'>
            {listing.name}
          </p>
          <div className='flex justify-center items-center gap-1 text-gray-600 mt-1'>
            <MdLocationOn className='h-5 w-5 text-green-600' />
            <p className='text-sm truncate'>{listing.city}, {listing.address}</p>
          </div>
          <p className='text-sm text-gray-500 mt-2 line-clamp-2'>
            {listing.description}
          </p>
        </div>

        {/* Price and Details */}
        <div className='text-gray-700 flex flex-col items-center gap-2 mt-3'>
          <p className='text-lg font-semibold text-blue-600'>
            ₹{listing.salary}
            {/* {listing.type === 'rent' && ' / month'} */}
          </p>
          <div className='flex gap-3 text-sm font-medium'>
            <span> {listing.jobType }</span>
            <span>{listing.skillsRequired} </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
