import { styled } from "baseui";

export const Wrapper = styled("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: $theme.colors.border13,

  "@media only screen and (max-width: 520px)": {
    backgroundColor: "#131516"
  }
}));

export const FormWrapper = styled("div", () => ({
  width: "470px",
  borderRadius: "3px",
  backgroundColor: "#ffffff",
  padding: "50px",
  display: "flex",
  flexDirection: "column",

  "@media only screen and (max-width: 500px)": {
    width: "100%",
    padding: "30px"
  }
}));

export const LogoWrapper = styled("div", () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "20px"
}));

export const LogoImage = styled("img", () => ({
  display: "block",
  backfaceVisibility: "hidden",
  maxWidth: "150px"
}));
