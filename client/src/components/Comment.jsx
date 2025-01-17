import React from 'react';
import '<react-quill-new></react-quill-new>/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
const Comment = () => {
    return (
        <div>
            <input
              className="text-4xl font-semibold bg-transparent outline-none"
              type="text"
              placeholder="My Awesome Story"
              name="title"
            />
            <div className="flex items-center gap-4">
              <label htmlFor="" className="text-sm">
                Choose a category:
              </label>
              <select
                name="category"
                id=""
                className="p-2 rounded-xl bg-white shadow-md"
              >
                <option value="general">General</option>
                <option value="web-design">Web Design</option>
                <option value="development">Development</option>
                <option value="databases">Databases</option>
                <option value="seo">Search Engines</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <textarea
              className="p-4 rounded-xl bg-white shadow-md"
              name="desc"
              placeholder="A Short Description"
            />
            <div className="flex flex-1 ">
              <div className="flex flex-col gap-2 mr-2">
                {/* <Upload type="image" setProgress={setProgress} setData={setImg}>
                  🌆
                </Upload>
                <Upload type="video" setProgress={setProgress} setData={setVideo}>
                  ▶️
                </Upload> */}
              </div>
              <ReactQuill
                theme="snow"
                className="flex-1 rounded-xl bg-white shadow-md"
                value={value}
                onChange={setValue}
                readOnly={0 < progress && progress < 100}
              />
            </div>
        </div>
    );
};

export default Comment;