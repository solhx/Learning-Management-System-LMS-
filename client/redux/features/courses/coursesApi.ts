import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "get-admin-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: ({ id, data }) => ({
        url: `get-courses`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: (result, error, id) => [{ type: 'Course', id }],
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-courses-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation ({
      query: ({question,courseId,contentId}) => ({
        url: `add-question`,
        body:{
          question,courseId,contentId
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation ({
      query: ({ answer, courseId, contentId, questionId }) => ({
    url: "add-answer",
    body: {
      answer,
      courseId,
      contentId,
      questionId,
    },
    method: "PUT",
    credentials: "include" as const,
    
      }),
    }),
    addReviewInCourse: builder.mutation({
  query: ({ review, rating, courseId }) => ({
    url: `add-review/${courseId}`,
    method: "PUT",
    body: {
      review,
      rating,
    },
    credentials: "include" as const,
  }),
}),
addReplyInReview: builder.mutation({
  query: ({ comment, courseId, reviewId }: any) => ({
    url: 'add-reply',
    method: 'PUT',
    body: {
      comment,
      courseId,
      reviewId,
    },
    credentials: 'include' as const,
  }),
}),


  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
} = courseApi;
