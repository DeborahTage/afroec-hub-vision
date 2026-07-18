package com.afroechub.util;

import java.util.List;
import java.util.stream.Collectors;

public final class StringListUtil {
    private StringListUtil() {}

    public static String join(List<String> values) {
        if (values == null || values.isEmpty()) return null;
        return values.stream().filter(v -> v != null && !v.isBlank())
                .map(String::trim).collect(Collectors.joining(","));
    }
}
