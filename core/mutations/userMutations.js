import { request } from "core/network/request";
import { gql } from "graphql-request";
import { useMutation } from "react-query";

const blockUser = async (variables) => {
  await request(
    null,
    gql`
      mutation blockUser($blockedId: ID!) {
        blockUser(blockedId: $blockedId)
      }
    `,
    variables
  );
};

export const useBlockUserMutation = (options) =>
  useMutation(blockUser, options);

const unblockUser = async (variables) => {
  await request(
    null,
    gql`
      mutation unblockUser($blockedId: ID!) {
        unblockUser(blockedId: $blockedId)
      }
    `,
    variables
  );
};

export const useUnblockUserMutation = (options) =>
  useMutation(unblockUser, options);
