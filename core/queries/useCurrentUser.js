import { gql } from "graphql-request";
import { request } from "../network/request";
import { useQuery } from "react-query";

export const fetchCurrentUser = async (ctx = null) => {
  const { currentUser } = await request(
    ctx,
    gql`
      query currentUser {
        currentUser {
          id
          admin
          username
          avatarUrl
          postCount
          rocketCount
          isOnline
          isCurrentUser
          moderatedPlanets {
            id
          }
        }
      }
    `
  );
  return currentUser;
};

export const useCurrentUser = () =>
  useQuery("currentUser", fetchCurrentUser, {
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  }); // refetch
// every 5 mins to update
// lastLogin/isOnline
