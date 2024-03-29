import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { media } from "./Media";

const GlobalStyles = createGlobalStyle`
  ${reset}
    a{
      text-decoration: none;
      color: inherit;
    }
    *{
      box-sizing: border-box;

      &::-webkit-scrollbar-thumb {
        background-color: rgba(255, 51, 102, .7);
        border-radius: 1000px;
      }
      &::-webkit-scrollbar {
        width:4px;
        height: 4px;
      }
      &::-webkit-scrollbar-track {
      }
    }
    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video{
      font-size: 100%;
      font-family: 'Pretendard';
      font-weight: 300;
      
      ${media.pc`
      font-size: 90%;
      `}
      ${media.mobile`
      font-size: 80%;
      `}
    }


`;

export default GlobalStyles;
