import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";

export default function Home({openTab}) {
  return (
    <Typography paragraph>
      HEllo {openTab}
      </Typography>
    
  );
}
