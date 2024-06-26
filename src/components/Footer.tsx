import { AiFillGithub, AiFillMail, AiOutlineTwitter } from "solid-icons/ai";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer class={styles.footer}>
      <p>
        &copy; {new Date().getFullYear()} The Nuxt Movies authors. All rights
        reserved.&nbsp;
        <a
          target="_blank"
          href="https://jason.codes/cookie-policy"
          rel="noopener"
        >
          Cookie Policy
        </a>
        .
      </p>
      <p>
        Designed by the Nuxt Movies authors, and ported by the Solid Movies
        authors, with the original data provided by&nbsp;
        <a target="_blank" href="https://www.themoviedb.org/" rel="noopener">
          TMDb
        </a>
        .
      </p>

      <ul class="nolist">
        <li>
          <a
            href="https://twitter.com/solidjs"
            target="_blank"
            aria-label="Link to Twitter account"
            rel="noopener"
          >
            <AiOutlineTwitter size={24} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/solidjs/solid-start/tree/movies/examples/movies"
            target="_blank"
            aria-label="Link to GitHub account"
            rel="noopener"
          >
            <AiFillGithub size={24} />
          </a>
        </li>
        <li>
          <a
            href="mailto:hello@jason.codes"
            aria-label="Link to Email"
            rel="noopener"
          >
            <AiFillMail size={24} />
          </a>
        </li>
      </ul>
    </footer>
  );
}
