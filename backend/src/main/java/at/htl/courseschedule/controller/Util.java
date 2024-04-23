package at.htl.courseschedule.controller;

import java.util.Arrays;

public final class Util {

    private Util() {}

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
                " order by word_similarity(%s, cast(:pattern as character(255))) desc", members[0])
        );

        Arrays.stream(members).skip(1).forEach(member ->
                builder.append(String.format(
                        ", word_similarity(%s, cast(:pattern as character(255))) desc", member)
                )
        );

        return builder.toString();
    }
}
