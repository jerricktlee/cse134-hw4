// Create post 
const createPostBtn = document.querySelector('#createPostBtn');
const createPostDialog = document.querySelector('#createPostDialog');

// Save post
const postForm = document.querySelector('#postForm');
const cancelSaveBtn = document.querySelector('#cancelSaveBtn');
const blogPostList = document.querySelector('#blogPostList');

// Delete post
const deletePostDialog = document.querySelector('#deletePostDialog');
const cancelDeleteBtn = document.querySelector('#cancelDeleteBtn');
const deleteForm = document.querySelector('#deleteForm');

// Array to store blog post contents, stored in localStorage
// Pre-populate blogPostArr with sample posts if localStorage is initially empty
var blogPostArr = JSON.parse(localStorage.getItem('blogPostArr')) || [
    {
        title: 'My Love for Mister Cat',
        date: '2023-02-28',
        summary: 'This is a summary of the first blog post.'
    },
    {
        title: 'Why his name is Mister Cat?',
        date: '2023-03-01',
        summary: 'This is the summary of the second blog post. It is 2 sentences long.'
    }
];

displayBlogPostArr();

createPostBtn.addEventListener('click', () => {
    postForm.reset();
    createPostDialog.showModal();
});

cancelSaveBtn.addEventListener('click', () => {
    if (createPostDialog.hasAttribute('data-index')) {
        createPostDialog.removeAttribute('data-index');
    }
    createPostDialog.close();
});

postForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const postTitle = document.querySelector('#postTitle').value;
    const postDate = document.querySelector('#postDate').value;
    const postSummary = document.querySelector('#postSummary').value;

    // Edits a pre-existing blog posts
    if (createPostDialog.hasAttribute('data-index')) {
        let currEl = createPostDialog.getAttribute('data-index');
        blogPostArr[currEl].title = postTitle;
        blogPostArr[currEl].date = postDate;
        blogPostArr[currEl].summary = postSummary;
    }
    // Appends a new blog post
    else {
        let newBlogPostEl = {
            title: postTitle,
            date: postDate,
            summary: postSummary
        }
        blogPostArr.push(newBlogPostEl);
    }

    if (createPostDialog.hasAttribute('data-index')) {
        createPostDialog.removeAttribute('data-index');
    }

    // Updates localStorage, blogPostArr, and the display
    localStorage.setItem('blogPostArr', JSON.stringify(blogPostArr));
    displayBlogPostArr();
    createPostDialog.close();

});

// Generates html elements for the new post and appends it to the DOM 
function displayBlogPostArr() {
    blogPostList.innerHTML = '';

        blogPostArr.forEach((blogPost, index) => {
            let new_li = document.createElement('li');
            let new_h2 = document.createElement('h2');
            let new_date = document.createElement('time');
            let new_para = document.createElement('p');
            let new_editBtn = document.createElement('button');
            let new_deleteBtn = document.createElement('button');

            new_h2.innerText = blogPost.title;
            new_date.innerText = blogPost.date;
            new_para.innerText = blogPost.summary;
            new_editBtn.innerText = 'Edit';
            new_deleteBtn.innerText = 'Delete';

            // Create bindings for edit and delete
            new_editBtn.addEventListener('click', () => {
                document.querySelector('#postTitle').value = blogPost.title;
                document.querySelector('#postDate').value = blogPost.date;
                document.querySelector('#postSummary').value = blogPost.summary;

                createPostDialog.setAttribute('data-index', index);
                createPostDialog.showModal();
            });

            new_deleteBtn.addEventListener('click', () => {
                deletePostDialog.setAttribute('data-index', index);
                deletePostDialog.showModal();
            });

            // Appends all new elements into a li element
            new_li.appendChild(new_h2);
            new_li.appendChild(new_date);
            new_li.appendChild(new_para);
            new_li.appendChild(new_editBtn);
            new_li.appendChild(new_deleteBtn);
            
            // Appends the list element to the ul 
            blogPostList.appendChild(new_li);
        });
}

// Bindings to delete a blog post
deleteForm.addEventListener('submit', (event) => {
    event.preventDefault;

    if (deletePostDialog.hasAttribute('data-index')) {
        let currPost = deletePostDialog.getAttribute('data-index');
        blogPostArr.splice(currPost, 1);
    }

    if (deletePostDialog.hasAttribute('data-index')) {
        deletePostDialog.removeAttribute('data-index');
    }

    localStorage.setItem('blogPostArr', JSON.stringify(blogPostArr));
    displayBlogPostArr();
    deletePostDialog.close();
});   

cancelDeleteBtn.addEventListener('click', () => {
    if (deletePostDialog.hasAttribute('data-index')) {
        deletePostDialog.removeAttribute('data-index');
    }
    deletePostDialog.close();
});