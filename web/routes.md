/ --> web: Landing page (web)
/ --> electron: logged out redirect --> /login; logged in redirect --> /home

/login
/register

--- Requires Login ---
/home --> posts from all joined planets (HomeSidebar, FoldersSidebar)
/home/folder/:folderId --> personal folder (HomeSidebar, FoldersSidebar)
/home/chat/:groupId --> group chat/direct message (HomeSidebar, GroupUsersSidebar if group)
/planet/:planetId --> posts from planet (PlanetSidebar, PlanetFoldersSidebar)
/planet/:planetId/channel/:channelId --> chat channel (PlanetSidebar, PlanetUsersSidebar)
/planet/:planetId/post/:postId --> post/comments (PlanetSidebar, PostParticipantsSidebar)
/planet/:planetId/folder/:folderId --> planet folder (PlanetSidebar, PlanetFoldersSidebar)
/explore --> explore planets (ExploreSidebar)
/settings --> settings
