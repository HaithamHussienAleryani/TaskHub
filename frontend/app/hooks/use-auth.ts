import { useMutation } from "@tanstack/react-query"
import { postData } from "~/lib/fetch-util"
import type { SignUpData } from "~/routes/auth/SignUp"

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: (data: SignUpData) => postData('/auth/register', data),
    })
}