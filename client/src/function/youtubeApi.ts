import axios from "axios";

export const getVideoId = async (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?/,
  );
  const videoId = match?.[1];
  try {
    const result = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=snippet`,
    );
    return result.data;
  } catch (err) {
    return err;
  }
};
