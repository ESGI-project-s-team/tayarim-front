import {useContext} from "react";
import {
    NavbarContext,
    TranslationContext,
    IsOpenContext,
    NotificationContext,
    LoaderContext,
    IsOpenSideBarContext,
    IsErrorContext,
    IsAdminContext,
    UserInfoContext,
    IsSuccessContext,
    PopupNotifyContext, ExpenseStatContext
} from "./contexts";

export function useNavbarContext() {
    return useContext(NavbarContext);
}

export function useTranslationContext() {
    return useContext(TranslationContext);
}

export function useIsOpenContext() {
    return useContext(IsOpenContext);
}

export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function useLoaderContext() {
    return useContext(LoaderContext);
}

export function useIsOpenSideBarContext() {
    return useContext(IsOpenSideBarContext);
}

export function useIsErrorContext() {
    return useContext(IsErrorContext);
}

export function useAdminContext() {
    return useContext(IsAdminContext);
}

export function useUserInfoContext() {
    return useContext(UserInfoContext);
}

export function useSuccessContext() {
    return useContext(IsSuccessContext);
}

export function usePopupNotify() {
    return useContext(PopupNotifyContext);
}

export function useExpenseStatContext() {
    return useContext(ExpenseStatContext);
}

