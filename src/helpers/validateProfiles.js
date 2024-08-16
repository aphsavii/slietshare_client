import axios from "axios";

const getLastRouteSegment = (url) => {
  url = url.replace(/\/$/, "");
  const segments = url.split("/");
  return segments[segments.length - 1];
};

const baseUrls = {
 codeforces:'https://codeforces.com/api/user.info?handles=',
 gfg:'https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=',
 leetcode:'https://alfa-leetcode-api.onrender.com/',
}
const validateProfile = async (link, platform) => {
    const userName = getLastRouteSegment(link);
        try {
            const response = await axios.get(baseUrls[platform] + userName);
            if (response.status === 200) {
                return true;
            }
        } catch (error) {
            return false;
        }
    return false
};

export {validateProfile}