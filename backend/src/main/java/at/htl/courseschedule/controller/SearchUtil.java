package at.htl.courseschedule.controller;

import java.util.Arrays;

public final class SearchUtil {

    private SearchUtil() {}

    public static <T> String getSimilarityString(Class<T> classType, String... members) {
        StringBuilder builder = new StringBuilder();
        builder.append(String.format("from %s ", classType.getName()));

        if (members.length == 0) {
            return builder.toString();
        }

        builder.append(String.format(
                "where word_similarity(%s, cast(:pattern as character(255))) > :minEntropy", members[0])
        );

        Arrays.stream(members).skip(1).forEach(member ->
                builder.append(String.format(
                        " or word_similarity(%s, cast(:pattern as character(255))) > :minEntropy", member)
                )
        );

        builder.append(String.format(
                " order by cast(word_similarity(%s, cast(:pattern as character(255))) as double) ", members[0])
        );

        Arrays.stream(members).skip(1).forEach(member ->
                builder.append(String.format(
                        "+ cast(word_similarity(%s, cast(:pattern as character(255))) as double) ", member)
                )
        );

        builder.append("desc");
        return builder.toString();
    }
}
