export const validFn = (type: string) => {
  const emailReg: { [key: string]: RegExp } = {
    email:
      /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
    password:
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    youtubeUrl:
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)$/,
  };

  return (x: string): boolean => emailReg[type].test(x);
};

export const splitTag = (x: string) => x.split("#").splice(1);
