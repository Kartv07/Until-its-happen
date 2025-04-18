import React, { useEffect, useState } from "react";
import Typeahead from "@/components/Typeahead";
import SunEditorComponent from "@/components/SunEditor";
import { getAllCategoriesParentCategories, getBlogsData, updateNewBlog } from "../../../../../../uih-blogs-frontend/api.service";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Loader from "@/components/Loader";

function UpdatePost() {
  const [addedNewCategory, setAddedNewCategory] = useState(false);
  const [addedNewParentCategory, setAddedNewParentCategory] = useState(false);
  const [description, setDescription] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);
  const [heading, setHeading] = useState(null);
  const [smallDesc, setSmallDesc] = useState(null);
  const [blogId, setBlogId] = useState(null);


  const router = useRouter();

  let pathName = router?.pathname;

  const getParentChildCategories = async () => {
    let res = await getAllCategoriesParentCategories();
    setParentCategories(res?.data?.parentCategories);
    setCategories(res?.data?.categories);
    let blogDetails = await getBlogsData(`slug=${pathName.split("/")[3]}`);
    if(blogDetails?.status == 200) {
      setHeading(blogDetails?.data?.[0]?.heading);
      setSmallDesc(blogDetails?.data?.[0]?.smallDesc);
      setDescription(blogDetails?.data?.[0]?.desc);
      setBlogId(blogDetails?.data?.[0]?._id);
      let catData = res?.data?.categories.filter((cat) => cat.slug == blogDetails?.data?.[0]?.categories?.slug);
      let parentData = res?.data?.parentCategories.filter((cat) => cat.slug == blogDetails?.data?.[0]?.parentCategories?.slug);
      if(catData?.length > 0){
        setSelectedCategory(catData[0]);
      }
      if(parentData?.length > 0){
        setSelectedParentCategory(parentData[0]);
      }
    }
  };


  useEffect(() => {
    getParentChildCategories();
  }, []);


  const handleSubmit = async () => {
    let postData = {
      heading: heading,
      smallDesc: smallDesc,
      desc: description,
      category: selectedCategory,
      parentCategory: selectedParentCategory,
    };
    let updateBlogReq = await updateNewBlog(postData, blogId);
    if (updateBlogReq?.status == 200) {
      Swal.fire({
        title: "Success!",
        text: updateBlogReq?.data?.message,
        icon: "success",
        background: "#[141414]",
        color: "#fff",
        confirmButtonText: "Go to Blog !",
        customClass: {
          confirmButton: "custom-alert-btn",
          popup: "custom-alert"
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/blogs/${selectedParentCategory?.slug}/${selectedCategory?.slug}/${updateBlogReq?.data?.slug}`); // Example redirect
        }
      });
    }
  };

  if(!description) {
    return <Loader />
  }

  return (
    <div className="p-8 flex justify-between items-start">
      <div className="w-[70%] bg-[#141414] border-2 border-[#1d1e24] rounded-lg p-4 px-8 flex flex-col space-y-6 ">
        <div className="flex justify-between items-center border-b-2 border-[#1d1e24] rounded-lg py-4">
          <div className="text-xl font-bold bg-gradient-to-r to-white from-[#53e1e8] text-transparent bg-clip-text">
            Add New Blog Post
          </div>
          <button
            onClick={() => handleSubmit()}
            disabled={
              !heading && !smallDesc && !description && !selectedCategory
            }
            className={`px-4 py-2 bg-gradient-to-r to-white from-[#53e1e8] text-black font-semibold rounded-lg border-2 border-[#1d1e24] ${heading && smallDesc && description && selectedCategory ? "hover:cursor-pointer hover:scale-105" : "cursor-not-allowed"}  transform transition-all duration-300`}
          >
            Submit Blog
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-xl font-bold">Heading</label>
          <textarea
            className="border-2 border-[#1d1e24] py-2 px-4 rounded-2xl"
            type="text"
            placeholder="Enter Heading..."
            onChange={(e) => setHeading(e.target.value)}
            defaultValue={heading}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-xl font-bold">Small Desc</label>
          <textarea
            className="border-2 border-[#1d1e24] py-2 px-4 rounded-2xl"
            type="text"
            placeholder="Enter Small Desc..."
            onChange={(e) => setSmallDesc(e.target.value)}
            defaultValue={smallDesc}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-xl font-bold">Description</label>
          <SunEditorComponent
            setDescription={setDescription}
            initialValue={description}
          />
        </div>
      </div>
      <div className="w-[27%] bg-[#141414] border-2 border-[#1d1e24] rounded-lg p-4 flex flex-col space-y-6 ">
        <div className="flex flex-col gap-4">
          <label className="text-xl font-bold">Category</label>
          <Typeahead
            options={categories}
            setAddedNewCategory={setAddedNewCategory}
            addedNewCategory={addedNewCategory}
            setSelected={setSelectedCategory}
            defaultValue={selectedCategory}
          />
          {addedNewCategory && (
            <div className="flex flex-col gap-4">
              <label>Category Description</label>
              <textarea
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    desc: e.target.value,
                  })
                }
                className="border-2 border-[#1d1e24] w-full py-2 px-4 rounded-xl"
                type="text"
                placeholder="Enter Category Description..."
              />
            </div>
          )}
          {addedNewCategory && (
            <>
              <label className="text-xl font-bold">Parent Category</label>
              <Typeahead
                options={parentCategories}
                setSelected={setSelectedParentCategory}
                setAddedNewCategory={setAddedNewParentCategory}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdatePost;

UpdatePost.layout = "ContentLayout";