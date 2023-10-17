import getCurrentPageCategory from './getCurrentPageCategory';
function checkRancanganPage(pathname) {
  const currentPageCategory = getCurrentPageCategory(pathname);
  if (currentPageCategory && currentPageCategory.video_discovery_url) {
    return (
      pathname.includes(currentPageCategory.video_discovery_url) ||
      pathname.includes('video/search')
    );
  }
  return false;
}

export default checkRancanganPage;
