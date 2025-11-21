"use client"

import { useState, ChangeEvent } from "react";
import { useFormStatus } from "react-dom";

interface Review {
  name: string;
  review: string;
  id: string;
}

interface Props {
 action: (formData:Review) => Promise<{ message: string}>;
  productId: string;
}


function SubmitButton() {
  const { pending } = useFormStatus();

  
  return (
    <button

      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? "Posting..." : "Submit Review"}
    </button>
  );
}

export default function AddReviewForm({action,  productId }: Props) {

  
  const [inputs, setInputs] = useState<Review>({id:productId, name: "", review: "" });
  

 // console.log("input>>>", inputs)
   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {


       const {name, value} = e.target
       
       setInputs({
          ...inputs, 
          [name]: value,

        })
     };


  return (
<form onSubmit={() => {  action(inputs);}}
 className="space-y-4">
      <h2 className="text-lg font-semibold">Add a Review</h2>
       <input type="hidden" name="productId" value={inputs.id} onChange={handleChange}/>

      <input
        name="name"
        type="text"
        value={inputs.name}
        onChange={handleChange}
        placeholder="Your name"
        className="w-full p-2 border rounded-md"
        required
      />

      <textarea
        name="review"
        placeholder="Write your review..."
        value={inputs.review}
        onChange={handleChange}
        className="w-full p-2 border rounded-md"
        required
      ></textarea>

      

      <SubmitButton  />

     
    </form>
  );
}
